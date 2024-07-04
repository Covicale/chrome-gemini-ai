export default function Instructions() {
  return (
    <div>
      <p>
        In order to be able to chat with the AI, you need to do the following:
      </p>
      <ol className="text-foreground/70 list-decimal list-inside">
        <li>
          Download{" "}
          <a
            className="underline"
            target="_blank"
            href="https://www.google.com/intl/en_uk/chrome/canary/"
          >
            Chrome Canary
          </a>
        </li>
        <li>
          Enable{" "}
          <span className="italic font-semibold">
            chrome://flags/#prompt-api-for-gemini-nano
          </span>
        </li>
        <li>
          Enable{" "}
          <span className="italic font-semibold">
            chrome://flags/#optimization-guide-on-device-model
          </span>
        </li>
        <li>
          Install Gemini Nano in
          <span className="italic font-semibold"> chrome://components </span>
          searching for &quot;Optimization Guide On Device Model&quot;
        </li>
        <li>Restart chrome.</li>
      </ol>
    </div>
  );
}
