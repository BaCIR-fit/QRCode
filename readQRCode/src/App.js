import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';


function App() {
  const videoRef = useRef(null);
  const [qrCodeContent, setQrCodeContent] = useState('');

  useEffect(() => {
    const scanner = new QrScanner(videoRef.current, result => {
      setQrCodeContent(result); // Set the QR Code content to the state variable
    });
    scanner.start().then(() => {
      // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
      // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
      // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
      // start the scanner earlier.
      QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        console.log(option);
      }));
    });


    // scanner.hasCamera(); // async

    return () => {
      scanner.stop();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <video ref={videoRef} style={{ width: '30%', height: 'auto' }}></video>
          <div id="qrCodeContent">{qrCodeContent}</div> {/* Display the QR Code content */}
      </header>
    </div>
  );
}

export default App;
