import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { io } from 'socket.io-client';
const socket = io('http://localhost:5550'); // Connect to the server
function App() {
  const [serverMessage, setServerMessage] = useState('');

  const [clientMessage, setClientMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('serverMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, `Server: ${message}`]);
    });

    // Cleanup on component unmount
    return () => socket.off('serverMessage');
  }, []);

  const sendMessageToServer = () => {
    if (clientMessage.trim()) {
      socket.emit('sendMessage', clientMessage); // Send message to the server
      setMessages((prevMessages) => [...prevMessages, `You: ${clientMessage}`]);
      setClientMessage('');
    }
  };




  console.log("Messages: ", messages);





  // socket.on('connect', () => {
  //   console.log('Connected to server:', socket.id);
  // });

  // // Sending a message to the server
  // socket.emit('message', 'Hello, world!');

  // // Receiving messages from the server
  // socket.on('message', (data) => {
  //   console.log('Message from server:', data);
  // });




  return (
    <div className="h-[100vh] w-full justify-center items-center flex">
      <div className="flex flex-col w-[50%] h-[44rem]  rounded-xl shadow-2xl">
        <div className="flex rounded-se-lg rounded-ss-lg bg-slate-500 h-[5rem] items-center p-2 px-4 justify-between">
          <div className="flex items-center bg-[] gap-4">
            <div className="w-[4rem] h-[4rem] bg-blue-500 rounded-full grid place-items-center text-2xl font-bold">S</div>
            <span className="font-bold">Sagun Basnet</span>
          </div>
          <div className="grid place-items-center text-2xl p-2 rounded-full cursor-pointer hover:bg-slate-400"><BsThreeDotsVertical /></div>
        </div>
        <div className="flex flex-col p-4 mt-2 gap-4 overflow-y-scroll h-full">
          <div className="flex justify-start w-full">
            <span className="w-[60%] text-justify bg-slate-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-end w-full">
            <span className="w-[60%] text-justify bg-blue-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-start w-full">
            <span className="w-[60%] text-justify bg-slate-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-end w-full">
            <span className="w-[60%] text-justify bg-blue-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-start w-full">
            <span className="w-[60%] text-justify bg-slate-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-end w-full">
            <span className="w-[60%] text-justify bg-blue-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-start w-full">
            <span className="w-[60%] text-justify bg-slate-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-end w-full">
            <span className="w-[60%] text-justify bg-blue-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid explicabo nemo alias dignissimos labore. Ipsum eius aspernatur reprehenderit quisquam neque.</span>
          </div>
          <div className="flex justify-end w-full">
            <span className="w-[60%] text-justify bg-blue-500 p-2 rounded-lg">Lorem, ipsum dolor sit amet consectetur</span>
          </div>
        </div>
        <div className="h-[5rem] rounded-ee-lg rounded-es-lg bg-slate-500 flex px-4 p-2 justify-evenly items-center">
          <div className="grid place-items-center text-3xl font-bold cursor-pointer">
            <IoMdAdd />
          </div>
          <textarea className="resize-none p-2 font-bold outline-none w-[28rem] rounded-md" placeholder="Type your message..." rows={1} name="" id="" value={clientMessage}
            onChange={(e) => setClientMessage(e.target.value)}></textarea>
          <IoSend onClick={sendMessageToServer} className="text-3xl cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default App