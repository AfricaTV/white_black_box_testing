/**
 * BRANCH COVERAGE
 * 
 * White Box technique ensuring every branch (if/else path)
 * is executed at least once during testing.
 * 
 * Target: detectByPatterns function
 * Branches:
 * - Branch 1: Java (true/false)
 * - Branch 2: C# (true/false)
 * - Branch 3: Python (true/false)
 * - Branch 4: TypeScript (true/false)
 * - Branch 5: JavaScript (true/false)
 * - Branch 6: Default null
 */

import { detectByPatterns } from '../detectLanguage';

describe('White Box: Branch Coverage', () => {

  it('BC-1: Branch 3 TRUE - Python pattern triggers python branch', () => {
    // Tests that Python branch evaluates to TRUE
    const pythonCode = `def hello():
    print("Hello")`;
    
    const result = detectByPatterns(pythonCode);
    
    expect(result).toBe('python');
  });

  it('BC-2: Branch 4 TRUE - TypeScript pattern triggers typescript branch', () => {
    // Tests that TypeScript branch evaluates to TRUE
    const tsCode = `interface User {
  name: string;
}`;
    
    const result = detectByPatterns(tsCode);
    
    expect(result).toBe('typescript');
  });

});

