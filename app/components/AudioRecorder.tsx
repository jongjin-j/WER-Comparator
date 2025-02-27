import { useState } from 'react';

export default function AudioRecorder() {
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [isRecording, setIsRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const recorder = new MediaRecorder(stream);

		recorder.ondataavailable = (e) => {
			setAudioBlob(e.data);
			setAudioUrl(URL.createObjectURL(e.data)); // Set audio URL for playback
		};

		recorder.start();
		setMediaRecorder(recorder);
		setIsRecording(true);
	};

	const stopRecording = () => {
		mediaRecorder?.stop();
		setIsRecording(false);
	};

	const handleSendAudio = async () => {
		const formData = new FormData();
		formData.append('audio', audioBlob as Blob, 'audio.webm');

		const response = await fetch('https://your-python-backend.com/upload', {
			method: 'POST',
			body: formData,
		});

		const result = await response.json();
		console.log(result);
	};

	return (
		<div>
			<button onClick={isRecording ? stopRecording : startRecording}>
				{isRecording ? 'Stop Recording' : 'Start Recording'}
			</button>
			<audio controls src={audioUrl ?? undefined}></audio>
			<button onClick={handleSendAudio} disabled={!audioBlob}>
				Send Audio to Backend
			</button>
		</div>
	);
}