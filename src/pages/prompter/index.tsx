import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import FontPicker from 'font-picker-react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { Socket } from 'socket.io-client';

import './index.scss';

import { Button, ConnectionPill, Input, RoomInfo } from '@/components';
import useLocalStorage from '@/hooks/useLocalStorage';
import { exportText } from '@/utils/helper';

function Prompter() {
  const { state } = useLocation();

  const { socket }: { socket: Socket } = useOutletContext();

  const [message, setMessage] = useLocalStorage('message', '');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [fontColor, setFontColor] = useState<string>('#000000');
  const [fontFamily, setFontFamily] = useState<string>('Open Sans');
  const [fontSize, setFontSize] = useState<string>('16');
  const [width, setWidth] = useState<string>('800');
  const [height, setHeight] = useState<string>('100');
  const [roomName, setRoomName] = useState<string>('');

  const backgroundRef = useRef<HTMLInputElement>(null);
  const fontColorRef = useRef<HTMLInputElement>(null);
  const fontSizeRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state) {
      setRoomName(`Room:  ${state.room}`);
    }
  }, [state]);

  useEffect(() => {
    const scrollToLastMessage = () => {
      const message = messageRef.current;
      message?.scroll({
        top: message.scrollHeight,
        behavior: 'smooth'
      });
    };

    socket &&
      socket.on('live-translate-receive', (data: string) => {
        console.log(data);
        flushSync(() => {
          setMessage(data);
        });
        scrollToLastMessage();
      });
  }, [socket, setMessage]);

  useEffect(() => {
    if (fontColorRef && fontColorRef.current) {
      document.documentElement.style.setProperty(
        '--font-color',
        fontColorRef.current?.value || '#000000'
      );
    }
  }, [fontColor]);

  useEffect(() => {
    if (backgroundRef && backgroundRef.current) {
      document.documentElement.style.setProperty(
        '--bg-color',
        backgroundRef.current?.value || '#ffffff'
      );
    }
  }, [bgColor]);

  useEffect(() => {
    if (fontSizeRef && fontSizeRef.current) {
      const size = fontSizeRef.current?.value ? fontSizeRef.current?.value + 'px' : '16px';
      document.documentElement.style.setProperty('--font-size', size);
    }
  }, [fontSize]);

  useEffect(() => {
    if (widthRef && widthRef.current) {
      const size = widthRef.current?.value ? widthRef.current?.value + 'px' : '800px';
      document.documentElement.style.setProperty('--width', size);
    }
  }, [width]);

  useEffect(() => {
    if (heightRef && heightRef.current) {
      const size = heightRef.current?.value ? heightRef.current?.value + 'px' : '100px';
      document.documentElement.style.setProperty('--height', size);
    }
  }, [height]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setWidth('350');
      setFontSize('14');
    }
  }, []);

  const handleExport = () => {
    exportText(message);
  };

  return (
    <div className="flex items-center flex-col justify-between relative p-4">
      <RoomInfo socket={socket} roomName={roomName} />
      <ConnectionPill socket={socket} />

      <div ref={messageRef} className="message apply-font">
        {message}
      </div>
      <div className="flex flex-col mb-[200px]">
        <h3 className="text-center mb-[10px] text-xl">Customize</h3>
        <div className="grid grid-cols-2 border-[1px] border-solid border-[#262626] p-4 md:flex mb-4">
          <div className="mr-0 md:mr-5 block md:flex md:flex-col mb-[10px] md:mb-0 ">
            <p className="mb-2">Width</p>

            <Input
              ref={widthRef}
              type="number"
              classnames="!w-20 !h-10"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>

          <div className="mr-0 md:mr-5 block md:flex md:flex-col mb-[10px] md:mb-0 ">
            <p className="mb-2">Height</p>
            <Input
              ref={heightRef}
              type="number"
              classnames="!w-20 !h-10"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="mr-0 md:mr-5 block md:flex md:flex-col mb-[10px] md:mb-0 ">
            <p className="mb-2">Background</p>
            <label className="pseudo__color" style={{ backgroundColor: bgColor }}>
              <Input
                ref={backgroundRef}
                type="color"
                classnames="!w-20 !h-10"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </label>
          </div>

          <div className="mr-0 md:mr-5 block md:flex md:flex-col mb-[10px] md:mb-0 ">
            <p className="mb-2">Font</p>
            <label className="pseudo__color" style={{ backgroundColor: fontColor }}>
              <Input
                ref={fontColorRef}
                type="color"
                classnames="!w-20 !h-10"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
              />
            </label>
          </div>

          <div className="mr-0 md:mr-5 block md:flex md:flex-col mb-[10px] md:mb-0 ">
            <p className="mb-2">Size</p>
            <Input
              ref={fontSizeRef}
              type="number"
              classnames="!w-20 !h-10"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>

          <div className="mr-0 md:mr-5 block md:flex md:flex-col mb-[10px] md:mb-0 ">
            <p className="mb-2">Style</p>
            <FontPicker
              apiKey={import.meta.env.VITE_GOOGLE_FONT_API_KEY}
              activeFontFamily={fontFamily}
              onChange={(nextFont) => setFontFamily(nextFont.family)}
            />
          </div>
        </div>
        <Button type="button" text="Export Speech" onClick={handleExport} />
      </div>
    </div>
  );
}

export default Prompter;
