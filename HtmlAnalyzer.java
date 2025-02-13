import java.io.*;
import java.net.*;
import java.util.*;

public class HtmlAnalyzer {

    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: java HtmlAnalyzer <URL>");
            return;
        }

        String urlString = args[0];
        try {
            String html = fetchHtmlContent(urlString);
            if (html == null) {
                throw new IOException("URL connection error");
            }

            String result = findDeepestText(html);
            System.out.println(result);
        } catch (MalformedHTMLException e) {
            System.out.println("malformed HTML");
        } catch (MalformedURLException e) {
            System.out.println("URL connection error");
        } catch (IOException e) {
            System.out.println("URL connection error");
        }
    }

    public static class MalformedHTMLException extends Exception {
        public MalformedHTMLException(String message) {
            super(message);
        }
    }

    private static String fetchHtmlContent(String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder html = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                html.append(line).append("\n");
            }
            return html.toString();
        }
    }

    /**
     * Finds the deepest nested text within the given HTML content.
     *
     * @param html the HTML content as a string
     * @return the deepest nested text
     * @throws MalformedHTMLException if the HTML is malformed
     */
    private static String findDeepestText(String html) throws MalformedHTMLException {
        Stack<String> stack = new Stack<>();
        String deepestText = "";
        int maxDepth = 0;
    
        // Split the input HTML by lines
        String[] lines = html.split("\n");
    
        for (String line : lines) {
            // Trim leading and trailing whitespaces
            String trimmedLine = line.trim();
    
            if (trimmedLine.isEmpty()) {
                continue; // Skip empty lines
            }
    
            // Check if it's a tag (either opening or closing)
            if (trimmedLine.startsWith("</")) {
                // Closing tag
                if (stack.isEmpty()) {
                    throw new MalformedHTMLException("Unbalanced tags");
                }
                
                // Pop the stack for the closing tag
                stack.pop();
            } else if (trimmedLine.startsWith("<")) {
                // Opening tag
                if (!trimmedLine.endsWith("/>")) { // Only handle non-self-closing tags
                    stack.push(trimmedLine);
                }
            } else {
                // Text content found, check the depth
                int depth = stack.size();
                if (depth > maxDepth) {
                    maxDepth = depth;
                    deepestText = trimmedLine;
                }
            }
        }
    
        // Check if there are any unclosed tags
        if (!stack.isEmpty()) {
            throw new MalformedHTMLException("Unclosed tags");
        }
    
        // If no text was found, throw an exception
        if (deepestText.isEmpty()) {
            throw new MalformedHTMLException("No text content found");
        }
    
        return deepestText;
    }
}
