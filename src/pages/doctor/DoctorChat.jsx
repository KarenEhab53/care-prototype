import ChatPanel from "../../components/ChatPanel";

export default function DoctorChat() {
  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Messages</h1>
          <p className="page__subtitle">Chat directly with your patients.</p>
        </div>
      </div>
      <ChatPanel perspective="doctor" />
    </div>
  );
}
