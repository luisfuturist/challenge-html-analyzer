# HTML Analyzer

## Overview

This is a Java program that analyzes an HTML document retrieved from a URL and finds the deepest text fragment in the HTML structure. If the HTML is malformed, it returns "malformed HTML". If there is a connection issue, it returns "URL connection error".

## Features

- Extracts the deepest text fragment from an HTML document.
- Detects malformed HTML and reports it.
- Handles URL connection errors gracefully.

## Requirements

- JDK 17 or later
- Internet connection

## Installation

1. Clone the repository (`git clone https://github.com/luisfuturist/challenge-html-analyzer`) or download the `.java` file in the repository.
2. Ensure you have JDK 17 installed.

## Compilation

Compile the Java program using the following command:
```sh
javac HtmlAnalyzer.java
```

## Usage

Run the program by providing a URL as an argument:

```sh
java HtmlAnalyzer <URL>
```

Example:

```sh
java HtmlAnalyzer http://hiring.axreng.com/internship/example1.html
```

## Expected Output

- If the HTML is valid and has a deepest text fragment, it will return the fragment.
- If the HTML is malformed, it will return:
  ```
  malformed HTML
  ```
- If there is a connection issue, it will return:
  ```
  URL connection error
  ```
