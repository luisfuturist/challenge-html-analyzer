import java.io.*;
import java.net.*;
import java.util.*;
import java.util.regex.*;

public class HtmlAnalyzer {

    private static final Pattern TAG_PATTERN = Pattern.compile("</?([a-zA-Z0-9]+)[^>]*>|([^<>]+)");

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
     * Parses the HTML content and returns the deepest text fragment.
     *
     * @param html the HTML content to parse
     * @return the deepest text fragment found in the HTML content, or "malformed HTML" if the HTML is not well-formed
     */
    private static String findDeepestText(String html) throws MalformedHTMLException {
        Stack<String> stack = new Stack<>();
        String deepestText = "";
        int maxDepth = 0;

        Matcher matcher = TAG_PATTERN.matcher(html);
        while (matcher.find()) {
            String tag = matcher.group(1);
            String text = matcher.group(2);

            if (tag != null) {
                // Opening tag: Increase depth
                if (matcher.group(0).charAt(1) != '/') {
                    stack.push(tag);
                } else {
                    // Closing tag: Decrease depth
                    if (stack.isEmpty()) {
                        throw new MalformedHTMLException("Unbalanced tags");
                    }

                    stack.pop();
                }
            } else if (text != null && !text.trim().isEmpty()) {
                // Text content found, check depth
                int depth = stack.size();

                if (depth > maxDepth) {
                    maxDepth = depth;
                    deepestText = text.trim();
                }
            }
        }

        if (!stack.isEmpty()) {
            throw new MalformedHTMLException("Unclosed tags");
        }

        if (deepestText.isEmpty()) {
            throw new MalformedHTMLException("No text content found");
        }

        return deepestText;
    }
}
