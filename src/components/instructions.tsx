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
          <a
            className="underline"
            target="_blank"
            href="chrome://flags/#prompt-api-for-gemini-nano"
          >
            Prompt API for Gemini Nano
          </a>
        </li>
        <li>
          Enable{" "}
          <a
            className="underline"
            target="_blank"
            href="chrome://flags/#optimization-guide-on-device-model"
          >
            Enables optimization guide on device
          </a>
        </li>
        <li>
          Install Gemini Nano{" "}
          <a className="underline" target="_blank" href="chrome://components/">
            here
          </a>
          , searching for &quot;Optimization Guide On Device Model&quot;
        </li>
        <li>Restart chrome.</li>
      </ol>
    </div>
  );
}
