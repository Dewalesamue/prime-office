# Bugfix Requirements Document

## Introduction

The GitHub activity streak counter in the portfolio is displaying incorrect and erratic behavior. The counter, which is currently implemented using an external service (`github-readme-streak-stats.herokuapp.com`), fails to accurately track consecutive days of GitHub activity. Instead of incrementing properly on consecutive days and resetting appropriately when activity is skipped, the counter shows unpredictable values (oscillating between 0 and 1) and displays outdated information (showing May 6 as the last activity date when the actual activity pattern is different).

This bug undermines the credibility of the portfolio's GitHub activity display and provides visitors with misleading information about the developer's contribution consistency.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the user has consecutive days of GitHub activity (commits/pushes) THEN the streak counter does not increment properly and shows erratic values instead of increasing by 1 each day

1.2 WHEN the user skips a day without GitHub activity THEN the streak counter does not consistently reset to 0 and instead shows random values (0, then 1, then 0 again)

1.3 WHEN the user resumes GitHub activity after a gap THEN the streak counter does not start at 1 for the new streak and instead displays unpredictable values

1.4 WHEN the streak counter is displayed THEN it shows outdated date information (e.g., May 6) that does not reflect the user's actual recent GitHub activity

1.5 WHEN the external service `github-readme-streak-stats.herokuapp.com` is queried THEN it returns inconsistent or stale data that does not match the user's actual GitHub contribution history

### Expected Behavior (Correct)

2.1 WHEN the user has consecutive days of GitHub activity (commits/pushes) THEN the streak counter SHALL increment by exactly 1 for each consecutive day with activity

2.2 WHEN the user skips a day without GitHub activity THEN the streak counter SHALL reset to 0 immediately

2.3 WHEN the user resumes GitHub activity after a gap (streak was 0) THEN the streak counter SHALL display 1 to indicate the start of a new streak

2.4 WHEN the streak counter is displayed THEN it SHALL show the current date or the most recent activity date that accurately reflects the user's actual GitHub contribution history

2.5 WHEN the streak data is retrieved THEN it SHALL accurately reflect the user's real-time GitHub contribution activity from the GitHub API or a reliable alternative source

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the GitHub stats card displays other metrics (total contributions, current streak, longest streak) THEN the system SHALL CONTINUE TO display these metrics in the same visual format and location

3.2 WHEN the user views the GitHub activity section THEN the system SHALL CONTINUE TO display the streak stats card with the same dark theme styling (`theme=dark&hide_border=true&background=0d1117`)

3.3 WHEN the GitHub username is `Prime-code2106` THEN the system SHALL CONTINUE TO query GitHub data for this specific username

3.4 WHEN the streak stats image loads THEN the system SHALL CONTINUE TO display it as a rounded image (`rounded-lg` class) with lazy loading enabled

3.5 WHEN other GitHub README stats are displayed (main stats card and top languages card) THEN the system SHALL CONTINUE TO function correctly and display accurate information
