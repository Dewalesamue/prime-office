# Implementation Plan

## Overview
Replace the unreliable external streak service with direct GitHub GraphQL API integration and client-side streak calculation to ensure accurate, real-time streak tracking.

---

## Tasks

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - External Service Returns Inaccurate Streak Data
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the external service returns incorrect streak data
  - **Scoped PBT Approach**: Scope the property to concrete failing cases - compare external service response with actual GitHub contribution data for username `Prime-code2106`
  - Test that for username `Prime-code2106`, when actual GitHub contributions show consecutive days of activity (e.g., 3 consecutive days), the streak counter displays the correct incrementing values (1, 2, 3) rather than erratic values (0, 1, 0)
  - Test that when there's a gap in activity (e.g., Day 1, Day 2, skip Day 3, Day 4), the streak resets to 0 after the gap and starts at 1 for the new streak
  - Test that the displayed "last activity date" matches the actual date of the most recent GitHub contribution (not an outdated date like May 6)
  - Run test on UNFIXED code (with external service `github-readme-streak-stats.herokuapp.com`)
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found:
    - Record instances where displayed streak != calculated streak from actual GitHub data
    - Record instances where displayed date != actual last contribution date
    - Record the external service response data vs. actual GitHub API response data
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [-] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Streak Elements Remain Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-streak interactions:
    - Click on repository cards and verify they open correct GitHub URLs in new tabs
    - Click "View Profile" button and verify it navigates to correct GitHub profile
    - Verify main GitHub stats card (repos, stars, followers) displays with current styling
    - Verify top languages card displays with current styling
    - Verify loading states for GitHub data fetches work correctly
    - Verify responsive layout behavior across different screen sizes
  - Write property-based tests capturing observed behavior patterns:
    - For all repository cards, clicking SHALL open the correct repo URL in a new tab
    - For all viewport sizes, the layout SHALL maintain the same responsive behavior
    - For all GitHub stats (repos, stars, followers, forks), the display SHALL use the same styling classes and structure
    - For all loading states, the spinner and loading indicators SHALL appear in the same locations
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 3. Implement GitHub GraphQL API integration and client-side streak calculation

  - [ ] 3.1 Set up environment configuration for GitHub API token
    - Create `.env` file in project root (if not exists)
    - Add `VITE_GITHUB_TOKEN` environment variable placeholder
    - Add `.env` to `.gitignore` to prevent token exposure
    - Document token creation process in comments:
      - GitHub Settings → Developer Settings → Personal Access Tokens → Generate new token
      - Required scope: `read:user` (minimal permission for reading contribution data)
    - Add TypeScript type definitions for environment variables
    - _Bug_Condition: isBugCondition(input) where input.dataSource == 'github-readme-streak-stats.herokuapp.com' AND data is stale/incorrect_
    - _Expected_Behavior: Secure token management with minimal required permissions_
    - _Preservation: Existing environment configuration and .gitignore rules remain unchanged_
    - _Requirements: 2.5, 3.3_

  - [ ] 3.2 Create GitHub API service module
    - Create new file `src/services/githubApi.ts`
    - Implement `fetchContributionData(username: string)` function using GitHub GraphQL API
    - Use GraphQL query to fetch `contributionsCollection` with daily contribution counts
    - Implement authentication using `VITE_GITHUB_TOKEN` from environment
    - Add error handling for API failures (network errors, rate limits, invalid tokens)
    - Add response caching to avoid excessive API calls (cache for 1 hour)
    - Return structured data: `{ date: string, contributionCount: number }[]`
    - _Bug_Condition: External service returns inconsistent data that doesn't match actual GitHub contributions_
    - _Expected_Behavior: Direct API integration returns accurate, real-time contribution data_
    - _Preservation: No changes to existing API service patterns or error handling for other GitHub endpoints_
    - _Requirements: 2.5_

  - [ ] 3.3 Implement streak calculation functions
    - Create new file `src/utils/streakCalculator.ts`
    - Implement `calculateCurrentStreak(contributions: ContributionData[]): number`
      - Count consecutive days with contributions from today backwards
      - Handle timezone considerations using UTC dates consistently
      - Return 0 if no current streak exists
    - Implement `calculateLongestStreak(contributions: ContributionData[]): number`
      - Find maximum consecutive day sequence in entire history
      - Handle edge cases: empty data, single day, all days
    - Implement `getTotalContributions(contributions: ContributionData[]): number`
      - Sum all contributions across the time period
    - Implement `getLastActivityDate(contributions: ContributionData[]): Date | null`
      - Return the most recent date with contributions
      - Return null if no contributions exist
    - Add comprehensive unit tests for each function with various contribution patterns
    - _Bug_Condition: isBugCondition(input) where calculated streak != displayed streak_
    - _Expected_Behavior: expectedBehavior(result) where result.currentStreak increments correctly on consecutive days, resets on gaps, and displays accurate dates_
    - _Preservation: No changes to existing utility functions or calculation logic for other metrics_
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.4 Create custom StreakDisplay component
    - Create new file `src/components/StreakDisplay.tsx`
    - Design component matching visual style of external service:
      - Dark theme with background color `#0d1117`
      - Use colors: ring=`#3b82f6`, fire=`#3b82f6`, currStreakNum=`#ffffff`
      - Display: Current Streak, Longest Streak, Total Contributions
      - Include fire emoji 🔥 for current streak, star emoji ⭐ for longest streak
    - Accept props: `currentStreak: number`, `longestStreak: number`, `totalContributions: number`, `lastActivityDate: Date | null`
    - Maintain `rounded-lg` styling for consistency
    - Add loading state placeholder
    - Add error state fallback UI with clear error message
    - Ensure responsive design matches existing card layouts
    - _Bug_Condition: External service displays incorrect streak values_
    - _Expected_Behavior: Custom component displays accurate calculated streak values_
    - _Preservation: Visual styling matches existing dark theme and layout patterns_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.4_

  - [ ] 3.5 Integrate streak calculation into GitHubActivity component
    - Modify `src/components/GitHubActivity.tsx`
    - Import `fetchContributionData` from `githubApi.ts`
    - Import streak calculation functions from `streakCalculator.ts`
    - Import `StreakDisplay` component
    - Add state variables for streak data:
      - `currentStreak: number`
      - `longestStreak: number`
      - `totalContributions: number`
      - `lastActivityDate: Date | null`
      - `streakLoading: boolean`
      - `streakError: string | null`
    - Add `useEffect` hook to fetch contribution data on component mount
    - Call streak calculation functions with fetched data
    - Update state with calculated values
    - Replace external service `<img>` tag (line ~267) with `<StreakDisplay>` component
    - Pass calculated streak data as props to `StreakDisplay`
    - Handle loading and error states gracefully
    - Preserve all other GitHub stats displays (main stats card, top languages card)
    - _Bug_Condition: isBugCondition(input) where input.dataSource == 'github-readme-streak-stats.herokuapp.com'_
    - _Expected_Behavior: Component displays accurate real-time streak data from GitHub API_
    - _Preservation: All other GitHub stats, repository displays, and visual styling remain unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 3.6 Add comprehensive error handling and fallback UI
    - In `GitHubActivity.tsx`, implement error boundary for streak data fetching
    - Handle specific error cases:
      - Missing or invalid GitHub token (show message: "GitHub token not configured")
      - API rate limit exceeded (show message: "Rate limit exceeded, try again later")
      - Network errors (show message: "Unable to fetch streak data")
      - Invalid username (show message: "GitHub user not found")
    - Display fallback UI when errors occur:
      - Show placeholder card with error message
      - Maintain same visual styling as successful state
      - Provide "Retry" button for transient errors
    - Log errors to console for debugging
    - Ensure other GitHub stats continue to display even if streak data fails
    - _Bug_Condition: External service failures cause complete display failure_
    - _Expected_Behavior: Graceful error handling with informative messages_
    - _Preservation: Error handling patterns for other GitHub data remain unchanged_
    - _Requirements: 2.5, 3.1, 3.5_

  - [ ] 3.7 Implement caching strategy for contribution data
    - In `githubApi.ts`, add caching mechanism:
      - Cache contribution data in memory with timestamp
      - Set cache expiration to 1 hour (3600000 ms)
      - Check cache before making API calls
      - Return cached data if valid, otherwise fetch fresh data
    - Add cache invalidation logic:
      - Allow manual cache refresh via component prop or button
      - Clear cache on component unmount if needed
    - Optimize API calls to avoid rate limiting:
      - Fetch only necessary date range (last 365 days for streak calculation)
      - Batch multiple requests if needed
    - Add cache status indicator in UI (optional: "Last updated: X minutes ago")
    - _Bug_Condition: External service caching causes stale data display_
    - _Expected_Behavior: Controlled caching with appropriate expiration ensures fresh data_
    - _Preservation: Existing caching patterns for other API calls remain unchanged_
    - _Requirements: 2.4, 2.5_

  - [ ] 3.8 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Accurate Real-Time Streak Calculation
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1 with FIXED code
    - Verify that for username `Prime-code2106`:
      - Consecutive days of activity show correctly incrementing streak values (1, 2, 3, ...)
      - Gaps in activity cause streak to reset to 0
      - New streaks after gaps start at 1
      - Displayed "last activity date" matches actual most recent contribution date
      - Calculated streak from GitHub API matches displayed streak
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - Document that all previously failing cases now pass
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 3.9 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Streak Elements Remain Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2 with FIXED code
    - Verify that all non-streak interactions produce identical behavior:
      - Repository card clicks open correct URLs in new tabs
      - "View Profile" button navigates to correct GitHub profile
      - Main GitHub stats card displays with same styling
      - Top languages card displays with same styling
      - Loading states work identically
      - Responsive layout behavior is unchanged
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions introduced)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Run all unit tests for streak calculation functions
  - Run all property-based tests for bug condition and preservation
  - Run integration tests for full component rendering
  - Verify visual regression: compare screenshots of fixed component with original
  - Ensure no console errors or warnings
  - Verify GitHub API token is properly configured in environment
  - Test with actual GitHub account to confirm real-world behavior
  - Ask the user if questions arise or if manual testing reveals issues

---

## Notes

**Testing Strategy:**
- Task 1 (Bug Condition Exploration): Write test BEFORE fix, expect FAILURE on unfixed code
- Task 2 (Preservation): Write tests BEFORE fix, expect PASS on unfixed code
- Task 3.8 (Fix Checking): Re-run Task 1 test, expect PASS on fixed code
- Task 3.9 (Preservation Checking): Re-run Task 2 tests, expect PASS on fixed code

**Implementation Order:**
1. Exploration test (will fail - confirms bug)
2. Preservation tests (will pass - confirms baseline)
3. Implementation (fix the bug)
4. Verification (tests now pass - confirms fix works and no regressions)

**Key Files Modified:**
- `src/components/GitHubActivity.tsx` (main integration point)
- `src/services/githubApi.ts` (new file - API integration)
- `src/utils/streakCalculator.ts` (new file - calculation logic)
- `src/components/StreakDisplay.tsx` (new file - custom display component)
- `.env` (environment configuration)
- `.gitignore` (ensure .env is excluded)

**Dependencies:**
- GitHub Personal Access Token with `read:user` scope
- GitHub GraphQL API access
- Existing project dependencies (React, TypeScript, Vite)
