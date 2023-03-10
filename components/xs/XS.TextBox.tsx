import React from "react";

interface PROPS {
  onChage: (e: string) => void;
  onEnter: any;
  input: string;
  onRefresh: any;
  saveHistory: any;
  loading: boolean;
  onSubmit: any;
}

export default function XSTextBox({ onChage, onEnter, input, onRefresh,onSubmit,loading,saveHistory }: PROPS) {
  return (
    <div className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
      <div className="relative flex items-center h-full flex-1 md:flex-col">
        <div className="flex-shrink-0 p-1.5">
          <div className="w-[30px] flex flex-col relative items-end">
            <div className="bg-[#5436DA] rounded-sm text-white flex justify-center items-center relative tracking-widest h-8 w-8 text-xs">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <textarea
          disabled={loading}
            tabIndex={0}
            data-id="e4f91a0c-8d82-4107-99df-a6726ee63272"
            rows={1}
            placeholder=""
            className="border-none focus:ring-0 focus:outline-none pl-2 m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent"
            style={{
              maxHeight: 200,
              height: 24,
              overflowY: "hidden",
            }}
            defaultValue={""}
            onChange={(e) => onChage(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input !== "") onEnter();
            }}
          />
         <button
            onClick={onSubmit}
            disabled={input === ""}
            className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
          >
            {
              loading?
              <span className="three-dot text-xl"></span>
              :
              <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 20 20"
              className="h-4 w-4 rotate-90"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>}
          </button>
        </div>
        <div className="ml-1 mt-1.5  md:w-full md:m-auto flex md:mb-2 gap-2 justify-center">
          <button onClick={onRefresh} className="btn ml-1 flex justify-center gap-2 btn-neutral border-0 md:border">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          </button>
          <button   onClick={saveHistory} className="btn ml-1 flex justify-center gap-2 btn-neutral border-0 md:border">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
