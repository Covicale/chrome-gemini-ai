import { z } from "zod";
import { useEffect, useState } from "react";
import { checkAiAvailable } from "@/lib/utils";
import Instructions from "./instructions";

interface InitAIProps {
  className?: string;
  onInit: ({ systemPrompt, topK, temperature }: any) => void;
}

const initAISchema = z.object({
  systemPrompt: z.string(),
  topK: z.number().min(0).max(50, "Top-K must be between 0 and 50").default(10),
  temperature: z
    .number()
    .min(0)
    .max(1, "Temperature must be between 0 and 1")
    .default(0.5),
});

export default function InitAI({ onInit, className }: InitAIProps) {
  const [formValues, setFormValues] = useState({
    systemPrompt: "",
    topK: "",
    temperature: "",
  });
  const [errors, setErrors] = useState({
    systemPrompt: "",
    topK: "",
    temperature: "",
  });

  const [aiAvailable, setAiAvailable] = useState(false);

  useEffect(() => {
    const checkAvailable = async () => {
      const available = await checkAiAvailable();
      setAiAvailable(available);
    };

    checkAvailable();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedFormValues = {
      ...formValues,
      topK: Number(formValues.topK),
      temperature: Number(formValues.temperature),
    };

    const result = initAISchema.safeParse(parsedFormValues);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({
        systemPrompt: "",
        topK: "",
        temperature: "",
      });
      onInit(result.data);
    }
  };

  return (
    <main
      className={`${className} flex flex-col gap-y-4 justify-center items-center`}
    >
      <h1 className="text-3xl md:text-5xl font-bold">Initialize AI</h1>
      <form
        className="flex flex-col gap-y-2 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col mb-4 gap-y-2 items-center justify-center">
          <label htmlFor="systemPrompt">System Prompt</label>
          <input
            name="systemPrompt"
            value={formValues.systemPrompt}
            onChange={handleChange}
            placeholder="Example: You are an assistant specialized in clothing."
            className="w-full border-2 py-1 px-2 md:py-2 text-sm md:px-4 rounded-xl"
            type="text"
          />
          {errors.systemPrompt && (
            <p className="text-red-500">{errors.systemPrompt}</p>
          )}
        </div>
        <div className="flex w-full gap-x-2 items-center">
          <input
            name="topK"
            value={formValues.topK}
            onChange={handleChange}
            placeholder="0 <= Top-K <= 50"
            className="border-2 py-1 px-2 md:py-2 md:px-4 rounded-xl"
            type="number"
          />
          <label htmlFor="topK">
            <a
              className="underline"
              href="https://huggingface.co/blog/how-to-generate#top-k-sampling"
              target="_blank"
            >
              Top-K
            </a>
          </label>
          {errors.topK && <p className="text-red-500">{errors.topK}</p>}
        </div>
        <div className="flex gap-x-2 items-center">
          <input
            name="temperature"
            value={formValues.temperature}
            onChange={handleChange}
            placeholder="0 <= Temperature <= 1"
            className="border-2 py-1 px-2 md:py-2 md:px-4 rounded-xl"
            type="number"
          />
          <label htmlFor="temperature">
            <a
              className="underline"
              href="https://huggingface.co/blog/how-to-generate#sampling"
              target="_blank"
            >
              Temperature
            </a>
          </label>
          {errors.temperature && (
            <p className="text-red-500">{errors.temperature}</p>
          )}
        </div>
        <button className="md:text-xl font-semibold border-2 rounded-xl mt-6 py-2 px-6">
          Initialize
        </button>
      </form>
      <div className="mx-4">
        {aiAvailable ? (
          <p className="text-green-800 font-bold">
            AI is available. You can now chat with the AI.
          </p>
        ) : (
          <p className="text-red-700 font-bold">
            AI is not available. Please follow the instructions below to enable
            it.
          </p>
        )}
        <Instructions />
      </div>
    </main>
  );
}
