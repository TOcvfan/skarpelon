import { useRef, useState } from 'react';
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";
import ButtonIcon from './ButtonIcon';
import { Box } from '@mui/material';
import Title from './title';

export default function TextArea(props) {
    const textareaRef = useRef(null);
    const [content, setContent] = useState('');

    const insertHtmlTag = (tag) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        const newText = `${value.substring(0, start)}<${tag}>${value.substring(start, end)}</${tag}>${value.substring(end)}`;
        setContent(newText);
        updateTextarea(newText, start + tag.length + 2, end + tag.length + 2);
    };

    const insertListHtmlTag = (tag) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        const newText = `${value.substring(0, start)}<${tag}>\n<li>${value.substring(start, end)}</li>\n</${tag}>${value.substring(end)}`;
        setContent(newText);
        updateTextarea(newText, start + tag.length + 2 + 1 + 4, end + tag.length + 2 + 1 + 4);
    };

    const updateTextarea = (value, start, end) => {
        const textarea = textareaRef.current;
        textarea.value = value;
        textarea.focus();
        textarea.setSelectionRange(start, end);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;

            const newText = `${value.substring(0, start)}\n${value.substring(end)}`;
            setContent(newText);
            updateTextarea(newText, start + 1, start + 1);
        }
    };

    const convertNewLinesToBr = (text) => {
        return text.split('\n').map((part, index) => (
            <span key={index}>
                {part}
                <br />
            </span>
        ));
    };

    const centrerLinie = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }

    return (
        <div>
            <Title>{props.label}</Title>
            <textarea
                ref={textareaRef}
                style={{
                    width: '100%',
                    height: '100px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    resize: 'none',
                }}
                onKeyDown={handleKeyDown}
                onChange={(e) => props.onChange(e.target.value)}
            ></textarea>
            <Box sx={centrerLinie}>
                <ButtonIcon onClick={() => insertHtmlTag('strong')}><FaBold /></ButtonIcon>
                <ButtonIcon onClick={() => insertHtmlTag('em')}><FaItalic /></ButtonIcon>
                <ButtonIcon onClick={() => insertHtmlTag('u')}><FaUnderline /></ButtonIcon>
                <ButtonIcon onClick={() => insertListHtmlTag('ul')}><FaList /></ButtonIcon>
                <ButtonIcon onClick={() => insertListHtmlTag('ol')}><FaListOl /></ButtonIcon>
                <ButtonIcon onClick={() => insertHtmlTag('li')}>liste emne</ButtonIcon>
            </Box>
            <Box sx={{ display: 'none' }}>
                {convertNewLinesToBr(content)}
            </Box>
        </div>
    );
}
