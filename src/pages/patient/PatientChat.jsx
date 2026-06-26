import ChatPanel from "../../components/ChatPanel";

export default function PatientChat() {
  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Messages</h1>
          <p className="page__subtitle">Chat directly with doctors you've booked with.</p>
        </div>
      </div>
      <ChatPanel perspective="patient" />
    </div>
  );
}
