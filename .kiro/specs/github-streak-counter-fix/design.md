# GitHub Streak Counter Bugfix Design

## Overview

The GitHub streak counter currently relies on an external third-party service (`github-readme-streak-stats.herokuapp.com`) that provides unreliable and stale data. The service fails to accurately track consecutive days of GitHub activity, showing erratic values (oscillating between 0 and 1) and outdated dates (e.g., May 6 when actual activity patterns differ).

This design proposes replacing the unreliable external service with a direct integration to the GitHub GraphQL API to calculate streak data in real-time. The fix will implement client-side streak calculation logic that processes GitHub contribution data to accurately determine current streak, longest streak, and total contributions. This approach ensures data accuracy, reduces dependency on third-party services, and provides real-time updates that reflect the user's actual GitHub activity.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when the external streak service returns inconsistent, stale, or incorrect streak data that doesn't match the user's actual GitHub contribution history
- **Property (P)**: The desired behavior when streak data is displayed - accurate real-time streak counts that correctly increment on consecutive activity days and reset when activity is skipped
- **Preservation**: Existing visual styling, layout, and other GitHub stats displays that must remain unchanged by the fix
- **Streak**: A sequence of consecutive days where the user has made at least one GitHub contribution (commit, pull request, issue, etc.)
- **Current Streak**: The number of consecutive days with activity leading up to today (or the most recent activity date)
- **Longest Streak**: The maximum number of consecutive days with activity in the user's entire GitHub history
- **Contribution**: Any GitHub activity including commits, pull requests, issues, code reviews, etc.
- **GitHub GraphQL API**: GitHub's modern API that provides structured access to contribution data
- **Contribution Calendar**: GitHub's data structure showing daily contribution counts

## Bug Details

### Bug Condition

The bug manifests when the external service `github-readme-streak-stats.herokuapp.com` is queried to display GitHub streak statistics. The service returns inconsistent, stale, or incorrect data that does not accurately reflect the user's actual GitHub contribution history. This results in erratic streak counts (oscillating between 0 and 1 instead of incrementing properly), outdated dates (showing May 6 when actual activity differs), and failure to properly reset or increment streaks based on actual contribution patterns.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type StreakDataRequest
  OUTPUT: boolean
  
  RETURN input.dataSource == 'github-readme-streak-stats.herokuapp.com'
         AND (input.streakValue != calculateActualStreak(input.username)
              OR input.displayedDate != getActualLastActivityDate(input.username)
              OR input.streakBehavior == 'erratic')
END FUNCTION

FUNCTION calculateActualStreak(username)
  contributions := fetchGitHubContributions(username)
  streak := 0
  currentDate := today()
  
  WHILE contributions[currentDate] > 0 DO
    streak := streak + 1
    currentDate := currentDate - 1 day
  END WHILE
  
  RETURN streak
END FUNCTION
```

### Examples

- **Example 1**: User makes commits on Day 1, Day 2, and Day 3 consecutively
  - **Expected**: Streak counter shows 1, then 2, then 3
  - **Actual (Bug)**: Streak counter shows 0, then 1, then 0 (erratic oscillation)

- **Example 2**: User makes commits on Day 1 and Day 2, skips Day 3, then commits on Day 4
  - **Expected**: Streak shows 1, then 2, then resets to 0, then shows 1 for new streak
  - **Actual (Bug)**: Streak shows 1, then 1, then 1, then 0 (incorrect behavior)

- **Example 3**: User's last activity was on January 15, and today is January 20
  - **Expected**: Streak counter shows 0 (no current streak) and displays January 15 as last activity
  - **Actual (Bug)**: Streak counter shows outdated date (May 6) and incorrect streak value

- **Edge Case**: User is in a different timezone than UTC
  - **Expected**: Streak calculation respects the user's timezone or uses consistent UTC-based calculation
  - **Actual (Bug)**: Timezone handling is unclear and may contribute to erratic behavior

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The visual styling of the streak stats display must remain identical (dark theme with `theme=dark&hide_border=true&background=0d1117&ring=3b82f6&fire=3b82f6&currStreakNum=ffffff`)
- The layout and positioning of the streak stats card within the GitHub Activity section must stay the same
- The rounded image styling (`rounded-lg` class) and lazy loading behavior must be preserved
- Other GitHub stats displays (main stats card showing repos/stars/followers and top languages card) must continue to function correctly
- The GitHub username `Prime-code2106` must continue to be used for all GitHub data queries

**Scope:**
All inputs and interactions that do NOT involve the streak counter display should be completely unaffected by this fix. This includes:
- Mouse clicks and interactions with other GitHub activity elements (repositories, profile button, etc.)
- Display of repository statistics (stars, forks, language badges)
- Loading states and error handling for other GitHub API calls
- Navigation to external GitHub URLs

## Hypothesized Root Cause

Based on the bug description and analysis of the current implementation, the most likely issues are:

1. **External Service Reliability**: The `github-readme-streak-stats.herokuapp.com` service is unreliable
   - The service may be experiencing downtime, rate limiting, or infrastructure issues
   - The service may have stale caching that doesn't reflect real-time GitHub activity
   - The service may have bugs in its own streak calculation logic

2. **Data Staleness**: The external service caches data and doesn't update frequently enough
   - Contribution data may be cached for hours or days, leading to outdated displays
   - The service may not properly invalidate its cache when new contributions are made

3. **Calculation Logic Errors**: The external service's streak calculation algorithm may be flawed
   - Incorrect handling of timezone differences between user activity and server time
   - Bugs in the logic that determines consecutive days (off-by-one errors, date boundary issues)
   - Failure to properly reset streaks when activity gaps occur

4. **API Rate Limiting**: The external service may be hitting GitHub API rate limits
   - When rate limited, the service may return stale or default data instead of current information
   - This could explain the erratic oscillation between values

## Correctness Properties

Property 1: Bug Condition - Accurate Real-Time Streak Calculation

_For any_ GitHub username where contribution data is available via the GitHub API, the fixed streak display SHALL calculate and show the correct current streak by counting consecutive days with contributions leading up to today, correctly increment the streak for each consecutive day with activity, reset to 0 when a day is skipped, and display the accurate date of the most recent contribution.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

Property 2: Preservation - Visual Styling and Other Stats Display

_For any_ interaction or display element that is NOT the streak counter (including other GitHub stats, repository lists, profile buttons, and visual styling), the fixed code SHALL produce exactly the same behavior and appearance as the original code, preserving all existing functionality, styling, and layout for non-streak elements.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct (external service unreliability), we will replace the external service with direct GitHub API integration.

**File**: `src/components/GitHubActivity.tsx`

**Function**: Component rendering and data fetching logic

**Specific Changes**:

1. **Add GitHub GraphQL API Integration**: Replace the external streak service with direct GitHub API calls
   - Add a new `useEffect` hook to fetch contribution data from GitHub GraphQL API
   - Use the `contributionsCollection` query to get daily contribution counts
   - Implement authentication using a GitHub Personal Access Token (stored in environment variables)

2. **Implement Client-Side Streak Calculation Logic**: Create functions to calculate streaks from contribution data
   - `calculateCurrentStreak(contributions)`: Count consecutive days with contributions from today backwards
   - `calculateLongestStreak(contributions)`: Find the maximum consecutive day sequence in the entire history
   - `getTotalContributions(contributions)`: Sum all contributions across the time period
   - Handle timezone considerations by using UTC dates consistently

3. **Create Custom Streak Display Component**: Replace the external service image with a custom React component
   - Design a component that matches the visual style of the external service (dark theme, same layout)
   - Display current streak, longest streak, and total contributions
   - Use the same color scheme (`ring=3b82f6&fire=3b82f6&currStreakNum=ffffff`)
   - Maintain the `rounded-lg` styling and responsive layout

4. **Add Caching and Error Handling**: Implement robust data fetching with fallbacks
   - Cache contribution data in component state to avoid excessive API calls
   - Implement error boundaries to handle API failures gracefully
   - Show loading states while fetching data
   - Display fallback UI if GitHub API is unavailable (with clear error message)

5. **Environment Configuration**: Set up secure API token management
   - Add `VITE_GITHUB_TOKEN` to environment variables (`.env` file)
   - Document the token creation process (GitHub Settings → Developer Settings → Personal Access Tokens)
   - Ensure the token has minimal required scopes (only `read:user` permission)
   - Add `.env` to `.gitignore` to prevent token exposure

### Alternative Approach (If Direct API Integration is Complex)

If implementing the full GitHub GraphQL API integration proves too complex or if API rate limits become an issue, an alternative approach would be:

**Use a More Reliable External Service**: Replace `github-readme-streak-stats.herokuapp.com` with a more reliable alternative such as:
- `github-readme-streak-stats.vercel.app` (if available) - Vercel hosting is generally more reliable
- `streak-stats.demolab.com` - Another popular streak stats service
- Self-hosted instance of the streak stats service on a reliable platform

This approach would require minimal code changes (just updating the URL) but doesn't address the fundamental issue of relying on external services.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code by observing the external service's erratic behavior, then verify the fix works correctly by testing the new streak calculation logic against known GitHub contribution patterns and ensuring existing visual elements remain unchanged.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis (external service unreliability). If we refute, we will need to re-hypothesize.

**Test Plan**: Manually observe the current streak counter behavior over multiple days while tracking actual GitHub contributions. Document instances where the displayed streak value doesn't match the actual contribution pattern. Additionally, inspect network requests to the external service to observe response data and identify inconsistencies.

**Test Cases**:
1. **Consecutive Day Test**: Make commits on 3 consecutive days and observe if streak increments correctly (will fail on unfixed code - expect erratic values like 0, 1, 0 instead of 1, 2, 3)
2. **Gap Day Test**: Make commits on Day 1 and Day 2, skip Day 3, then commit on Day 4 - observe if streak resets properly (will fail on unfixed code - expect incorrect reset behavior)
3. **Date Accuracy Test**: Compare the "last activity date" shown by the streak counter with the actual date of the most recent commit (will fail on unfixed code - expect outdated date like May 6)
4. **Service Response Test**: Inspect the HTTP response from `github-readme-streak-stats.herokuapp.com` and compare with actual GitHub contribution data from the GitHub API (will fail on unfixed code - expect mismatched data)

**Expected Counterexamples**:
- Streak counter shows 0 when there should be a streak of 2 or 3
- Streak counter shows 1 repeatedly instead of incrementing
- Last activity date shows May 6 when actual last commit was in January
- External service returns cached/stale data that doesn't match GitHub API responses
- Possible causes: service downtime, stale caching, calculation bugs, rate limiting

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds (when streak data is requested), the fixed function produces the expected behavior (accurate real-time streak calculation).

**Pseudocode:**
```
FOR ALL username WHERE hasGitHubContributions(username) DO
  contributionData := fetchGitHubContributions(username)
  calculatedStreak := calculateCurrentStreak(contributionData)
  displayedStreak := getDisplayedStreakValue()
  
  ASSERT calculatedStreak == displayedStreak
  ASSERT displayedDate == getActualLastActivityDate(contributionData)
  ASSERT streakIncrementsCorrectlyOnConsecutiveDays(contributionData)
  ASSERT streakResetsCorrectlyOnGapDays(contributionData)
END FOR
```

**Testing Approach**: Create unit tests that mock GitHub API responses with known contribution patterns and verify the streak calculation logic produces correct results.

**Test Cases**:
1. **Consecutive Days Streak Test**: Mock contribution data with 5 consecutive days of activity, verify current streak = 5
2. **Gap Day Reset Test**: Mock contribution data with 3 days of activity, 1 gap day, then 2 more days of activity, verify current streak = 2 (not 5)
3. **No Current Streak Test**: Mock contribution data where last activity was 5 days ago, verify current streak = 0
4. **Longest Streak Test**: Mock contribution data with multiple streak periods, verify longest streak is correctly identified
5. **Edge Case - Today's Contribution**: Mock contribution data including today's date, verify streak includes today
6. **Edge Case - Timezone Boundary**: Mock contribution data at timezone boundaries (23:59 UTC vs 00:01 UTC), verify correct day counting

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold (interactions with non-streak elements), the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL interaction WHERE NOT isStreakCounterInteraction(interaction) DO
  originalBehavior := observeOriginalBehavior(interaction)
  fixedBehavior := observeFixedBehavior(interaction)
  
  ASSERT originalBehavior == fixedBehavior
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain (different user interactions, viewport sizes, theme states)
- It catches edge cases that manual unit tests might miss (unusual interaction sequences, race conditions)
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for all non-streak interactions (clicking repositories, viewing profile, loading other stats), then write property-based tests capturing that behavior. After applying the fix, run the same tests to verify identical behavior.

**Test Cases**:
1. **Repository Click Preservation**: Verify clicking on repository cards opens the correct GitHub URL in a new tab (same behavior before and after fix)
2. **Profile Button Preservation**: Verify "View Profile" button navigates to the correct GitHub profile URL (same behavior before and after fix)
3. **Stats Display Preservation**: Verify the main GitHub stats card (repos, stars, followers) displays correctly with the same styling (same appearance before and after fix)
4. **Top Languages Preservation**: Verify the top languages card displays correctly with the same styling (same appearance before and after fix)
5. **Loading State Preservation**: Verify loading spinners and states for other GitHub data fetches work identically (same UX before and after fix)
6. **Responsive Layout Preservation**: Verify the entire GitHub Activity section maintains the same responsive behavior across different screen sizes (same layout before and after fix)

### Unit Tests

- Test `calculateCurrentStreak` function with various contribution patterns (consecutive days, gaps, empty data)
- Test `calculateLongestStreak` function with multiple streak periods and edge cases
- Test `getTotalContributions` function with different contribution counts
- Test date handling logic for timezone edge cases (UTC boundaries, daylight saving time transitions)
- Test error handling when GitHub API returns errors or rate limit responses
- Test caching logic to ensure data is refreshed appropriately without excessive API calls

### Property-Based Tests

- Generate random contribution patterns (varying lengths, gaps, and contribution counts) and verify streak calculations are always correct
- Generate random dates and timezones and verify date handling is consistent
- Generate random API response scenarios (success, errors, rate limits) and verify error handling is robust
- Test that visual styling properties (colors, borders, backgrounds) remain unchanged across many rendering scenarios

### Integration Tests

- Test full component rendering with real GitHub API calls (using a test account with known contribution history)
- Test the complete user flow: component mounts → data fetches → streak calculates → display renders
- Test switching between different GitHub usernames (if that functionality exists) and verify streak data updates correctly
- Test that the streak display updates correctly when new contributions are made (simulate time passing and new commits)
- Test visual regression: capture screenshots of the fixed component and compare with the original to ensure styling is preserved
