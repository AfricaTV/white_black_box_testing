/**
 * STATEMENT COVERAGE
 * 
 * White Box technique ensuring every statement (line of code)
 * is executed at least once during testing.
 * 
 * Target: detectByPatterns function
 * Statements to cover: All return statements for each language
 */

import { detectByPatterns } from '../detectLanguage';

describe('White Box: Statement Coverage', () => {

  it('SC-1: Execute Java detection statement (return "java")', () => {
    // Input triggers Java branch, executes return 'java' statement
    const javaCode = 'import java.util.Scanner;';
    
    const result = detectByPatterns(javaCode);
    
    expect(result).toBe('java');
  });

  it('SC-2: Execute null return statement (no pattern matched)', () => {
    // Input doesn't match any pattern, executes return null statement
    const unknownCode = 'hello world';
    
    const result = detectByPatterns(unknownCode);
    
    expect(result).toBeNull();
  });

});

