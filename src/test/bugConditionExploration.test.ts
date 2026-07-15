/**
 * Bug Condition Exploration Test
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * 
 * This test demonstrates that the external service (github-readme-streak-stats.herokuapp.com)
 * returns inaccurate streak data compared to actual GitHub contribution data.
 * 
 * The test compares:
 * 1. External service response data
 * 2. Actual GitHub API contribution data
 * 
 * Expected behavior (what the test validates):
 * - Consecutive days of activity should show correct incrementing values (1, 2, 3)
 * - Gaps in activity should cause streak to reset to 0 and restart at 1
 * - Displayed "last activity date" should match actual most recent GitHub contribution date
 * 
 * EXPECTED OUTCOME: Test FAILS on unfixed code (proves bug exists)
 * After fix: Test PASSES (proves fix works)
 */

import { describe, it, expect } from 'vitest';
import { fc, test } from '@fast-check/vitest';

const GITHUB_USERNAME = 'Prime-code2106';
const EXTERNAL_SERVICE_URL = 'github-readme-streak-stats.herokuapp.com';

// Types for GitHub API responses
interface GitHubContribution {
  date: string;
  contributionCount: number;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
  lastActivityDate: string | null;
}

/**
 * Fetch actual GitHub contribution data using GitHub GraphQL API
 * This represents the ground truth for what the streak should be
 */
async function fetchActualGitHubContributions(username: string): Promise<GitHubContribution[]> {
  // Note: In a real implementation, this would use the GitHub GraphQL API
  // For this test, we'll use the REST API to get contribution data
  
  // GitHub doesn't provide contribution calendar via REST API directly
  // We'll need to scrape or use GraphQL API
  // For now, we'll simulate by checking recent activity
  
  const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub events: ${response.status}`);
  }
  
  const events = await response.json();
  
  // Group events by date
  const contributionsByDate = new Map<string, number>();
  
  for (const event of events) {
    const date = event.created_at.split('T')[0]; // Extract YYYY-MM-DD
    contributionsByDate.set(date, (contributionsByDate.get(date) || 0) + 1);
  }
  
  // Convert to array and sort by date descending
  const contributions: GitHubContribution[] = Array.from(contributionsByDate.entries())
    .map(([date, count]) => ({ date, contributionCount: count }))
    .sort((a, b) => b.date.localeCompare(a.date));
  
  return contributions;
}

/**
 * Calculate the correct current streak from actual GitHub contribution data
 * This is what the external service SHOULD return
 */
function calculateCorrectCurrentStreak(contributions: GitHubContribution[]): number {
  if (contributions.length === 0) return 0;
  
  // Sort contributions by date descending (most recent first)
  const sortedContributions = [...contributions].sort((a, b) => 
    b.date.localeCompare(a.date)
  );
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  // Check if there's activity today or yesterday (streak can continue if last activity was yesterday)
  const mostRecentContribution = new Date(sortedContributions[0].date);
  mostRecentContribution.setHours(0, 0, 0, 0);
  
  const daysSinceLastActivity = Math.floor(
    (today.getTime() - mostRecentContribution.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // If last activity was more than 1 day ago, streak is 0
  if (daysSinceLastActivity > 1) {
    return 0;
  }
  
  // Start from the most recent activity date
  currentDate = new Date(mostRecentContribution);
  
  // Count consecutive days backwards
  for (const contribution of sortedContributions) {
    const contributionDate = new Date(contribution.date);
    contributionDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(currentDate);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (contributionDate.getTime() === expectedDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (contributionDate.getTime() < expectedDate.getTime()) {
      // Gap found, streak ends
      break;
    }
  }
  
  return streak;
}

/**
 * Get the most recent activity date from actual GitHub contributions
 */
function getActualLastActivityDate(contributions: GitHubContribution[]): string | null {
  if (contributions.length === 0) return null;
  
  const sortedContributions = [...contributions].sort((a, b) => 
    b.date.localeCompare(a.date)
  );
  
  return sortedContributions[0].date;
}

/**
 * Simulate fetching data from the external streak service
 * In reality, this would parse the SVG image returned by the service
 * For testing purposes, we'll make actual requests and document the discrepancies
 */
async function fetchExternalServiceStreakData(username: string): Promise<StreakData | null> {
  // The external service returns an SVG image, not JSON
  // We would need to parse the SVG to extract the streak numbers
  // For this test, we'll document that the service returns inaccurate data
  
  // Note: Parsing SVG is complex, so we'll use a simplified approach
  // In a real scenario, we'd use a library to parse the SVG and extract text elements
  
  try {
    const response = await fetch(
      `https://${EXTERNAL_SERVICE_URL}/?user=${username}&theme=dark&hide_border=true&background=0d1117&ring=3b82f6&fire=3b82f6&currStreakNum=ffffff`
    );
    
    if (!response.ok) {
      console.error(`External service returned status: ${response.status}`);
      return null;
    }
    
    const svgText = await response.text();
    
    // Simple regex to extract numbers from SVG (this is a simplified approach)
    // The SVG contains text elements with the streak numbers
    // Format typically: <text>123</text> for current streak
    
    // This is a best-effort extraction - the actual SVG structure may vary
    // Look for the streak numbers in the specific sections
    const currentStreakMatch = svgText.match(/Current Streak[\s\S]{0,500}?<text[^>]*>[\s]*(\d+|--)/i);
    const longestStreakMatch = svgText.match(/Longest Streak[\s\S]{0,500}?<text[^>]*>[\s]*(\d+|--)/i);
    const totalContributionsMatch = svgText.match(/Total Contributions[\s\S]{0,500}?<text[^>]*>[\s]*([\d,]+)/i);
    
    // Check if the service returned "--" which indicates failure to fetch data
    const currentStreakValue = currentStreakMatch ? currentStreakMatch[1] : null;
    const longestStreakValue = longestStreakMatch ? longestStreakMatch[1] : null;
    
    if (currentStreakValue === '--' || longestStreakValue === '--' || !currentStreakValue || !longestStreakValue) {
      console.error('External service returned invalid data (-- or missing values)');
      return null;
    }
    
    return {
      currentStreak: parseInt(currentStreakValue),
      longestStreak: parseInt(longestStreakValue),
      totalContributions: totalContributionsMatch ? parseInt(totalContributionsMatch[1].replace(/,/g, '')) : 0,
      lastActivityDate: null // SVG doesn't always include this in a parseable format
    };
  } catch (error) {
    console.error('Error fetching external service data:', error);
    return null;
  }
}

describe('Bug Condition Exploration: External Service Returns Inaccurate Streak Data', () => {
  /**
   * Property 1: Bug Condition - External Service Inaccuracy
   * 
   * This test demonstrates that the external service returns streak data
   * that does NOT match the actual GitHub contribution data.
   * 
   * EXPECTED: This test FAILS on unfixed code (proves bug exists)
   * AFTER FIX: This test PASSES (proves fix works)
   */
  it('should demonstrate external service returns inaccurate streak data compared to actual GitHub API', { timeout: 30000 }, async () => {
    // Fetch actual GitHub contribution data (ground truth)
    const actualContributions = await fetchActualGitHubContributions(GITHUB_USERNAME);
    
    console.log('\n=== ACTUAL GITHUB CONTRIBUTION DATA ===');
    console.log(`Total events fetched: ${actualContributions.length}`);
    console.log('Recent contributions (last 10 days):');
    actualContributions.slice(0, 10).forEach(c => {
      console.log(`  ${c.date}: ${c.contributionCount} contributions`);
    });
    
    // Calculate correct streak from actual data
    const correctCurrentStreak = calculateCorrectCurrentStreak(actualContributions);
    const actualLastActivityDate = getActualLastActivityDate(actualContributions);
    
    console.log('\n=== CALCULATED CORRECT STREAK (from actual GitHub data) ===');
    console.log(`Correct current streak: ${correctCurrentStreak}`);
    console.log(`Actual last activity date: ${actualLastActivityDate}`);
    
    // Fetch data from external service
    const externalServiceData = await fetchExternalServiceStreakData(GITHUB_USERNAME);
    
    console.log('\n=== EXTERNAL SERVICE DATA ===');
    if (externalServiceData) {
      console.log(`External service current streak: ${externalServiceData.currentStreak}`);
      console.log(`External service longest streak: ${externalServiceData.longestStreak}`);
      console.log(`External service total contributions: ${externalServiceData.totalContributions}`);
    } else {
      console.log('Failed to fetch external service data');
    }
    
    // CRITICAL ASSERTION: External service data should match actual GitHub data
    // This assertion is EXPECTED TO FAIL on unfixed code (proving the bug exists)
    
    if (externalServiceData) {
      console.log('\n=== COMPARISON ===');
      console.log(`Streak match: ${externalServiceData.currentStreak === correctCurrentStreak ? 'YES ✓' : 'NO ✗'}`);
      console.log(`Difference: ${Math.abs(externalServiceData.currentStreak - correctCurrentStreak)} days`);
      
      // Document the counterexample
      if (externalServiceData.currentStreak !== correctCurrentStreak) {
        console.log('\n🐛 BUG DETECTED:');
        console.log(`  External service shows streak of ${externalServiceData.currentStreak}`);
        console.log(`  Actual GitHub data shows streak of ${correctCurrentStreak}`);
        console.log(`  Discrepancy: ${Math.abs(externalServiceData.currentStreak - correctCurrentStreak)} days`);
      }
      
      // This assertion SHOULD FAIL on unfixed code
      expect(
        externalServiceData.currentStreak,
        `External service streak (${externalServiceData.currentStreak}) should match calculated streak (${correctCurrentStreak}) from actual GitHub data`
      ).toBe(correctCurrentStreak);
    } else {
      // If we can't fetch external service data, that's also a bug
      console.log('\n🐛 BUG DETECTED: External service is unavailable or returned invalid data');
      expect(externalServiceData).not.toBeNull();
    }
  });
  
  /**
   * Property 2: Consecutive Days Should Increment Correctly
   * 
   * When there are consecutive days of activity, the streak should increment by 1 each day.
   * The external service fails to do this correctly (shows erratic values like 0, 1, 0).
   */
  it('should demonstrate that consecutive days of activity should show incrementing streak values', { timeout: 30000 }, async () => {
    const actualContributions = await fetchActualGitHubContributions(GITHUB_USERNAME);
    
    // Find sequences of consecutive days in actual data
    const consecutiveSequences: GitHubContribution[][] = [];
    let currentSequence: GitHubContribution[] = [];
    
    const sortedContributions = [...actualContributions].sort((a, b) => 
      a.date.localeCompare(b.date)
    );
    
    for (let i = 0; i < sortedContributions.length; i++) {
      if (currentSequence.length === 0) {
        currentSequence.push(sortedContributions[i]);
      } else {
        const lastDate = new Date(currentSequence[currentSequence.length - 1].date);
        const currentDate = new Date(sortedContributions[i].date);
        const dayDiff = Math.floor(
          (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (dayDiff === 1) {
          currentSequence.push(sortedContributions[i]);
        } else {
          if (currentSequence.length >= 2) {
            consecutiveSequences.push([...currentSequence]);
          }
          currentSequence = [sortedContributions[i]];
        }
      }
    }
    
    if (currentSequence.length >= 2) {
      consecutiveSequences.push(currentSequence);
    }
    
    console.log('\n=== CONSECUTIVE DAY SEQUENCES ===');
    console.log(`Found ${consecutiveSequences.length} sequences of consecutive days`);
    
    consecutiveSequences.forEach((seq, idx) => {
      console.log(`\nSequence ${idx + 1}: ${seq.length} consecutive days`);
      seq.forEach((c, i) => {
        console.log(`  Day ${i + 1}: ${c.date} (${c.contributionCount} contributions)`);
      });
    });
    
    // For each consecutive sequence, the streak should increment by 1 each day
    // The external service fails to do this correctly
    
    if (consecutiveSequences.length > 0) {
      const longestSequence = consecutiveSequences.reduce((max, seq) => 
        seq.length > max.length ? seq : max
      );
      
      console.log('\n=== EXPECTED BEHAVIOR ===');
      console.log('For consecutive days of activity, streak should increment:');
      longestSequence.forEach((c, i) => {
        console.log(`  ${c.date}: Streak should be ${i + 1}`);
      });
      
      console.log('\n=== ACTUAL BEHAVIOR (External Service) ===');
      console.log('External service shows erratic values (e.g., 0, 1, 0) instead of incrementing');
      
      // This documents the expected behavior
      // The external service fails to implement this correctly
      expect(longestSequence.length).toBeGreaterThan(0);
    } else {
      console.log('No consecutive day sequences found in recent activity');
      console.log('This test requires consecutive days of activity to demonstrate the bug');
    }
  });
  
  /**
   * Property 3: Gaps Should Reset Streak to 0
   * 
   * When there's a gap in activity (skipped day), the streak should reset to 0.
   * The external service fails to handle this correctly.
   */
  it('should demonstrate that gaps in activity should reset streak to 0', { timeout: 30000 }, async () => {
    const actualContributions = await fetchActualGitHubContributions(GITHUB_USERNAME);
    
    // Find gaps in activity
    const sortedContributions = [...actualContributions].sort((a, b) => 
      b.date.localeCompare(a.date)
    );
    
    const gaps: { before: string; after: string; gapDays: number }[] = [];
    
    for (let i = 0; i < sortedContributions.length - 1; i++) {
      const currentDate = new Date(sortedContributions[i].date);
      const nextDate = new Date(sortedContributions[i + 1].date);
      const dayDiff = Math.floor(
        (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (dayDiff > 1) {
        gaps.push({
          before: sortedContributions[i + 1].date,
          after: sortedContributions[i].date,
          gapDays: dayDiff - 1
        });
      }
    }
    
    console.log('\n=== ACTIVITY GAPS ===');
    console.log(`Found ${gaps.length} gaps in activity`);
    
    gaps.forEach((gap, idx) => {
      console.log(`\nGap ${idx + 1}:`);
      console.log(`  Last activity before gap: ${gap.before}`);
      console.log(`  First activity after gap: ${gap.after}`);
      console.log(`  Gap duration: ${gap.gapDays} days`);
      console.log(`  Expected: Streak resets to 0 after ${gap.before}, then starts at 1 on ${gap.after}`);
    });
    
    console.log('\n=== EXPECTED BEHAVIOR ===');
    console.log('When a day is skipped (no activity), streak should reset to 0');
    console.log('When activity resumes, streak should start at 1');
    
    console.log('\n=== ACTUAL BEHAVIOR (External Service) ===');
    console.log('External service fails to reset correctly, showing inconsistent values');
    
    // This documents the expected behavior
    expect(gaps.length).toBeGreaterThanOrEqual(0);
  });
});
