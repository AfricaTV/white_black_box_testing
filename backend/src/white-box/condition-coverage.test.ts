/**
 * CONDITION COVERAGE
 * 
 * White Box technique ensuring every boolean sub-expression
 * in a condition is tested for both TRUE and FALSE.
 * 
 * Target: detectByPatterns function - Java branch conditions
 * 
 * Java branch has 3 OR conditions:
 * - Condition A: /import\s+java\./.test(code)
 * - Condition B: /System\.out\.print/.test(code)
 * - Condition C: /public\s+static\s+void\s+main/.test(code)
 * 
 * For full condition coverage, each sub-condition should be TRUE independently.
 */

import { detectByPatterns } from '../detectLanguage';

describe('White Box: Condition Coverage', () => {

  it('CC-1: Java Condition A TRUE - "import java." pattern', () => {
    // Only Condition A is TRUE (import java.)
    const code = 'import java.util.List;';
    
    const result = detectByPatterns(code);
    
    expect(result).toBe('java');
  });

  it('CC-2: Java Condition B TRUE - "System.out.print" pattern', () => {
    // Only Condition B is TRUE (System.out.print)
    const code = 'System.out.println("Hello");';
    
    const result = detectByPatterns(code);
    
    expect(result).toBe('java');
  });

});

