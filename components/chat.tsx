/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SMConversation from "./sm/SM.Conversation";
import SMSideNav from "./sm/SM.SideNav";
import SMTextBox from "./sm/Sm.TextBox";
import XSConversation from "./xs/XS.Conversation";
import XSTextBox from "./xs/XS.TextBox";
import XSMenu from "./xs/XSMenu";

export default function Chat() {
  const [item, setItem] = useState({
    loading: false,
    data: [],
    error: "",
    choices: [],
    title: "",
  });
  const [input, setInput] = useState("");
  const [groups, setGroup] = useState<any>([]);
  const [history, setHistry] = useState({ loading: true, data: [] });
  const [currentResult, setCurrentResult] = useState("");
  async function fetchData() {
    if (item.title !== "" || input !== "") {
      setItem({ ...item, loading: true, title: input });
      const chatData = [
        ...groups,
        ...[
          {
            title: input,
            res: "_",
          },
        ],
      ];
      setGroup(chatData);

      var data = JSON.stringify({
        model: "text-davinci-003",
        prompt:
          currentResult !== ""
            ? currentResult + (item.title || input)
            : item.title || input,
        temperature: 0.9,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });

      var config = {
        method: "post",
        url: "https://api.openai.com/v1/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setItem({
            ...item,
            loading: false,
            data: response.data,
            choices: response.data.choices,
            error: "",
          });
          //modify item on the top of the stack.
          const finalData = chatData.map((x: any) => {
            return {
              ...x,
              res: x.res === "_" ? response.data.choices[0].text : x.res,
            };
          });

          setGroup(finalData);
          setCurrentResult(response.data.choices[0].text);
          // localStorage.setItem("histories", JSON.stringify(finalData));
          setInput("");
        })
        .catch(function (error) {
          setItem({ ...item, loading: false, error: "Error" });
        });
    }
  }

  useEffect(() => {
    readHistories();
  }, [item.loading, groups]);

  const readHistories = () => {
    const data = localStorage.getItem("histories");
    setHistry({
      ...history,
      loading: false,
      data: data ? JSON.parse(data) : [],
    });
  };

  const onRefresh = () => {
    // alert(groups[groups.length-1].title)
    setItem({ ...item, loading: true, title: groups[groups.length - 1].title });
    setInput(groups[groups.length - 1].title);
    fetchData();
  };

  const saveHistory = () => {
    const savedHistoryRaw = localStorage.getItem("histories");
    const savedHistory =
      savedHistoryRaw &&
      savedHistoryRaw !== null &&
      savedHistoryRaw !== undefined
        ? JSON.parse(savedHistoryRaw)
        : [];
    const newHistory = {
      title: groups[groups.length - 1].title,
      data: groups,
    };
    const history = [...savedHistory, ...[newHistory]];
    localStorage.setItem("histories", JSON.stringify(history));
  };

  return (
    <div id="__next">
      <div className="overflow-hidden w-full h-full relative hidden sm:block">
        <div className="flex h-screen flex-1 flex-col md:pl-[260px]">
          <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
            <SMConversation
              groups={groups}
              loading={item.loading}
              onPlaceholderClick={(e) => {
                setInput(e);
                fetchData();
              }}
            />
            <section className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent  md:bg-vert-light-gradient bg-white dark:bg-gray-800 dark:md:bg-vert-dark-gradient">
              <SMTextBox
                onChage={(e) => setInput(e)}
                onEnter={fetchData}
                onRefresh={onRefresh}
                input={input}
                loading={item.loading}
                saveHistory={saveHistory}
                onSubmit={fetchData}
              />
              <div className="px-3 max-w-[70%] mx-auto pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
                <a
                  href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  ChatGPT Dec 15 Version
                </a>
                . Free Research Preview. Our goal is to make AI systems more
                natural and safe to interact with. Your feedback will help me
                for further improvements. API integrated by:{" "}
                <Link
                  className="text-blue-600"
                  href="https://www.linkedin.com/in/mesfin-tsegaye"
                >
                  Mesfin Tsegaye
                </Link>
              </div>
            </section>
          </main>
        </div>
        <section className="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
          <SMSideNav
            history={history.data}
            onHistoryClick={(e: any) => {
              setGroup(e.data);
            }}
            newChat={() => setGroup([])}
          />
        </section>
      </div>

      {/* small device  */}
      <div className="overflow-hidden sm:hidden w-full h-full relative">
        <div className="flex h-screen flex-1 flex-col md:pl-[260px]">
          <XSMenu
            history={history.data}
            onHistoryClick={(e: any) => {
              setGroup(e.data);
            }}
            newChat={() => setGroup([])}
          />
          <main className="relative pt-20 h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
            <XSConversation
              groups={groups}
              loading={item.loading}
              onPlaceholderClick={(e) => {
                setInput(e);
                fetchData();
              }}
            />
            <section className="fixed bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
              <XSTextBox
                onChage={(e) => setInput(e)}
                onEnter={fetchData}
                onSubmit={fetchData}
                input={input}
                loading={item.loading}
                onRefresh={onRefresh}
                saveHistory={saveHistory}
              />
              <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
                <a
                  href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  ChatGPT Dec 15 Version
                </a>
                . Free Research Preview. Our goal is to make AI systems more
                natural and safe to interact with. Your feedback will help me
                for further improvements. API integrated by:{" "}
                <Link
                  className="text-blue-600"
                  href="https://www.linkedin.com/in/mesfin-tsegaye"
                >
                  Mesfin Tsegaye
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* small device  */}
    </div>
  );
}
