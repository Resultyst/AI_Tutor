import React from 'react';

export default function VoiceWidget() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[600px] flex flex-col relative overflow-hidden">
        <iframe 
          id="audio_iframe" 
          src="https://widget.synthflow.ai/widget/v2/1732343503028x857518276495238500/1732343502931x804837155150238200" 
          allow="microphone" 
          className="w-full h-full absolute inset-0 border-none bg-transparent"
          style={{ pointerEvents: 'auto' }}
        />
      </div>
    </div>
  );
}