/**
 * Language detection by code patterns
 * This module is extracted for unit testing (White Box Testing)
 */

/**
 * Detects programming language by analyzing code patterns
 * 
 * Control Flow:
 * - Branch 1: Java detection (import java, System.out, public static void main)
 * - Branch 2: C# detection (using System, Console.Write, namespace)
 * - Branch 3: Python detection (import, from import, def, __name__)
 * - Branch 4: TypeScript detection (interface, type, enum, type annotations)
 * - Branch 5: JavaScript detection (require, export, import from)
 * - Branch 6: Default (returns null)
 */
export function detectByPatterns(code: string): string | null {
  // Branch 1: Java
  if (
    /import\s+java\./.test(code) ||
    /System\.out\.print/.test(code) ||
    /public\s+static\s+void\s+main\s*\(\s*String/.test(code)
  ) {
    return 'java';
  }

  // Branch 2: C#
  if (
    /using\s+System;/.test(code) ||
    /Console\.Write/.test(code) ||
    /namespace\s+\w+/.test(code)
  ) {
    return 'csharp';
  }

  // Branch 3: Python
  if (
    /^import\s+\w+/m.test(code) ||
    /^from\s+\w+\s+import/m.test(code) ||
    /def\s+\w+\s*\(.*\)\s*:/.test(code) ||
    /__name__\s*==\s*["']__main__["']/.test(code)
  ) {
    return 'python';
  }

  // Branch 4: TypeScript
  if (
    /\binterface\s+\w+\s*\{/.test(code) ||
    /\btype\s+\w+\s*=/.test(code) ||
    /\benum\s+\w+\s*\{/.test(code) ||
    /:\s*(string|number|boolean|void)\b/.test(code) ||
    /<T(\s+extends\s+\w+)?>/.test(code)
  ) {
    return 'typescript';
  }

  // Branch 5: JavaScript
  if (
    /const\s+\w+\s*=\s*require\(/.test(code) ||
    /export\s+(default\s+)?/.test(code) ||
    /import\s+.*\s+from\s+['"]/.test(code)
  ) {
    return 'javascript';
  }

  // Branch 6: No pattern matched
  return null;
}

