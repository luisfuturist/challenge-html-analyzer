const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'files');

// Ensure the test directory exists
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir);
}

// HTML Example 1 (Simple structure)
const example1 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
    This is the body.
  </body>
</html>
`;

// HTML Example 2 (Multiple nested elements)
const example2 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
    <div>
      Text inside the div.
      <div>
        Text inside the second div.
      </div>
    </div>
  </body>
</html>
`;

// HTML Example 3 (Malformed HTML with unclosed tag)
const example3 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
    <div>Text inside the div.
  </body>
</html>
`;

// HTML Example 4 (Deeply nested elements)
const example4 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
    <div>
      <section>
        <article>
          Text inside the article.
        </article>
      </section>
    </div>
  </body>
</html>
`;

// HTML Example 5 (Empty body with title)
const example5 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
  </body>
</html>
`;

// HTML Example 6 (Nested lists)
const example6 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
    <ul>
      <li>
        First item
        <ul>
          <li>
            Subitem
          </li>
          <li>
            Sub-subitem
            <ul>
              <li>
                Sub-sub-subitem
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </body>
</html>
`;

// HTML Example 7 (Malformed HTML with extra closing tag)
const example7 = `
<html>
  <head>
    <title>
      This is the title.
    </title>
  </head>
  <body>
    This is the body.
  </body>
</html>
</html>
`;

// HTML Example 8 (Indented content)
const example8 = `
<html>
    <head>
        <title>
          Indented title.
        </title>
    </head>
    <body>
        Indented body.
    </body>
</html>
`;

// HTML Example 9 (Empty line and indentation with content)
const example9 = `
<html>
    
  <head>
    <title>
      Title with indentation and space.
    </title>
  </head>

  <body>
    This is the body with indentation and blank lines above.
  </body>
    
</html>
`;

// HTML Example 10 (Multiple blank lines and indentation)
const example10 = `
<html>
    
  <head>
    <title>
      Title with indentation and blank lines.
    </title>
  </head>
  
  <body>
    This is the body, ignoring blank lines and indentation.
    
  </body>
  
</html>
`;

// HTML Example 11 (Blank line after tag)
const example11 = `
<html>

  <head>
    <title>
      Title with blank line before body.
    </title>
  </head>
  
  <body>
    This is the body after a blank line.
  </body>
</html>
`;

// Write each example to a file in the test/ directory
fs.writeFileSync(path.join(testDir, 'example1.html'), example1);
fs.writeFileSync(path.join(testDir, 'example2.html'), example2);
fs.writeFileSync(path.join(testDir, 'example3.html'), example3);
fs.writeFileSync(path.join(testDir, 'example4.html'), example4);
fs.writeFileSync(path.join(testDir, 'example5.html'), example5);
fs.writeFileSync(path.join(testDir, 'example6.html'), example6);
fs.writeFileSync(path.join(testDir, 'example7.html'), example7);
fs.writeFileSync(path.join(testDir, 'example8.html'), example8);
fs.writeFileSync(path.join(testDir, 'example9.html'), example9);
fs.writeFileSync(path.join(testDir, 'example10.html'), example10);
fs.writeFileSync(path.join(testDir, 'example11.html'), example11);

console.log('Test HTML files generated in the "files/" directory.');
