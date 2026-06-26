import { useState } from "react";
import { chatThreads as initialThreads } from "../data/mockData";
import { IconSend, IconPaperclip } from "./icons";
import "./ChatPanel.css";

// `perspective` is "patient" or "doctor" — flips which message bubbles
// align right vs left, since the same mock thread is viewed from both sides.
export default function ChatPanel({ perspective }) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState(initialThreads[0]?.id);
  const [draft, setDraft] = useState("");

  const active = threads.find((t) => t.id === activeId);
  const selfSender = perspective; // messages "from" this role render on the right

  function send() {
    if (!draft.trim() || !active) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? {
              ...t,
              lastMessage: draft.trim(),
              messages: [...t.messages, { from: selfSender, text: draft.trim(), time: "Now" }],
            }
          : t
      )
    );
    setDraft("");
  }

  return (
    <div className="chat-panel">
      <div className="chat-panel__threads">
        {threads.map((t) => (
          <button
            key={t.id}
            className={`chat-thread ${t.id === activeId ? "is-active" : ""}`}
            onClick={() => setActiveId(t.id)}
          >
            <span className="chat-thread__avatar">{t.withName.charAt(perspective === "patient" ? 4 : 0)}</span>
            <span className="chat-thread__info">
              <span className="chat-thread__name">{t.withName}</span>
              <span className="chat-thread__preview">{t.lastMessage}</span>
            </span>
            {t.unread > 0 && <span className="chat-thread__unread">{t.unread}</span>}
          </button>
        ))}
      </div>

      <div className="chat-panel__conversation">
        {active ? (
          <>
            <div className="chat-panel__header">
              <strong>{active.withName}</strong>
            </div>
            <div className="chat-panel__messages">
              {active.messages.map((m, i) => (
                <div key={i} className={`chat-bubble-row ${m.from === selfSender ? "is-self" : ""}`}>
                  <div className="chat-bubble">
                    <p>{m.text}</p>
                    <span>{m.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-panel__input">
              <button className="chat-panel__attach" aria-label="Attach file">
                <IconPaperclip width={17} height={17} />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button className="chat-panel__send" onClick={send} aria-label="Send">
                <IconSend width={16} height={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="chat-panel__empty">Select a conversation</div>
        )}
      </div>
    </div>
  );
}
