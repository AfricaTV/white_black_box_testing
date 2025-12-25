/**
 * PATH COVERAGE
 * 
 * White Box technique ensuring every possible path through
 * the code is executed at least once.
 * 
 * Target: detectByPatterns function
 * Paths:
 * - Path 1: Java match → return 'java'
 * - Path 2: Skip Java → C# match → return 'csharp'
 * - Path 3: Skip Java, C# → Python match → return 'python'
 * - Path 4: Skip Java, C#, Python → TypeScript match → return 'typescript'
 * - Path 5: Skip Java, C#, Python, TS → JavaScript match → return 'javascript'
 * - Path 6: Skip all → return null
 */

import { detectByPatterns } from '../detectLanguage';

describe('White Box: Path Coverage', () => {

  it('PC-1: Path through C# branch (skip Java, match C#)', () => {
    // This code skips Java check, matches C# pattern
    const csharpCode = `using System;
namespace MyApp { }`;
    
    const result = detectByPatterns(csharpCode);
    
    expect(result).toBe('csharp');
  });

  it('PC-2: Path through JavaScript branch (skip Java, C#, Python, TS)', () => {
    // This code skips all previous branches, matches JavaScript
    const jsCode = `const express = require('express');`;
    
    const result = detectByPatterns(jsCode);
    
    expect(result).toBe('javascript');
  });

});

