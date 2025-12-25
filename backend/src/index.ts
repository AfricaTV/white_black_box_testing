import express from "express";
import cors from "cors";
import hljs from "highlight.js";

const app = express();

app.use(cors());
app.use(express.json());

// check if server is alive
app.get("/api/health", (_req: express.Request, res: express.Response) => {
  res.json({ ok: true });
});

// main highlight endpoint
app.post("/api/highlight", (req: express.Request, res: express.Response) => {
  const { code, language } = req.body;

  if (!code) {
    res.status(400).json({ error: "Code is required" });
    return;
  }

  try {
    let highlighted: string;
    let detectedLanguage: string;
    
    // languages we know for sure
    const knownLanguages = [
      'javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'csharp', 
      'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'scala', 'sql',
      'html', 'css', 'scss', 'less', 'json', 'xml', 'yaml', 'markdown',
      'bash', 'shell', 'powershell', 'dockerfile', 'makefile',
      'lua', 'perl', 'r', 'matlab', 'julia', 'haskell', 'elixir', 'erlang',
      'objectivec', 'dart', 'groovy', 'coffeescript', 'clojure', 'fsharp',
      'vbnet', 'assembly', 'fortran', 'cobol', 'pascal', 'delphi',
      'ini', 'nginx', 'apache', 'diff', 'plaintext'
    ];

    // detect language by typical patterns
    const detectByPatterns = (code: string): string | null => {
      // java
      if (/import\s+java\./.test(code) || /System\.out\.print/.test(code) || /public\s+static\s+void\s+main\s*\(\s*String/.test(code)) {
        return 'java';
      }
      // c#
      if (/using\s+System;/.test(code) || /Console\.Write/.test(code) || /namespace\s+\w+/.test(code)) {
        return 'csharp';
      }
      // python
      if (/^import\s+\w+/m.test(code) || /^from\s+\w+\s+import/m.test(code) || /def\s+\w+\s*\(.*\)\s*:/.test(code) || /__name__\s*==\s*["']__main__["']/.test(code)) {
        return 'python';
      }
      // typescript (check before js)
      if (/\binterface\s+\w+\s*\{/.test(code) || /\btype\s+\w+\s*=/.test(code) || /\benum\s+\w+\s*\{/.test(code) || /:\s*(string|number|boolean|void)\b/.test(code) || /<T(\s+extends\s+\w+)?>/.test(code)) {
        return 'typescript';
      }
      // javascript
      if (/const\s+\w+\s*=\s*require\(/.test(code) || /export\s+(default\s+)?/.test(code) || /import\s+.*\s+from\s+['"]/.test(code)) {
        return 'javascript';
      }
      return null;
    };

    if (language && language !== "auto") {
      // language picked manually
      const result = hljs.highlight(code, { language });
      highlighted = result.value;
      detectedLanguage = language;
    } else {
      // try pattern detection first
      const patternDetected = detectByPatterns(code);
      
      if (patternDetected) {
        const result = hljs.highlight(code, { language: patternDetected });
        highlighted = result.value;
        detectedLanguage = patternDetected;
        console.log(`Pattern detected: ${patternDetected}`);
      } else {
        // fallback to hljs auto
        const result = hljs.highlightAuto(code);
        highlighted = result.value;
        
        const lang = result.language || "";
        const relevance = result.relevance || 0;
        
        console.log(`Auto detected: ${lang}, Relevance: ${relevance}`);
        
        if (lang && knownLanguages.includes(lang)) {
          detectedLanguage = lang;
        } else {
          detectedLanguage = "unknown";
        }
      }
    }

    res.json({ html: highlighted, language: detectedLanguage });
  } catch (error) {
    // something went wrong - just escape the code
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    res.json({ html: escaped, language: "unknown" });
  }
});

// get all languages hljs supports
app.get("/api/languages", (_req: express.Request, res: express.Response) => {
  const languages = hljs.listLanguages();
  res.json({ languages });
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});
