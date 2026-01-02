import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import customCard from "../grapes/customCard";
import "../components/GrapesEditor.css"
export default function GrapesEditor() {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) return;

        editorRef.current = grapesjs.init({
            container: "#right-panel",
            height: "100vh",
            width: "auto",
            storageManager: false,

            blockManager: {
                appendTo: "#left-panel",
            },
        });
        editorRef.current.on("load", () => {
            editorRef.current.addStyle(`
                .custom-card {
                    border: 1px solid #ddd;
                    padding: 1rem;
                    width: 18.75rem;
                    text-align: center;
                    border-radius: 0.5rem;
                    background: #fff;
                }

                .custom-card img {
                    width: 100%;
                    border-radius: 0.375rem;
                    display: block;
                }

                .custom-card h3 {
                    margin: 0.75rem 0 0.5rem;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .custom-card p {
                    margin: 0 0 0.75rem;
                    font-size: 0.9rem;
                    color: #555;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .custom-card .btn {
                    display: inline-block;
                    padding: 0.5rem 0.75rem;
                    background: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 0.25rem;
                    font-family: Arial, Helvetica, sans-serif;
                }
            `);
        });
        customCard(editorRef.current);
    }, []);

    const exportHTML = () => {
        const editor = editorRef.current;
        const html = editor.getHtml();
        const css = editor.getCss();

        const blob = new Blob(
            [`<style>${css}</style>${html}`],
            { type: "text/html" }
        );

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "export.html";
        a.click();
    };

    return (
        <>
            <div id="export-button-container">
                <a className="export-button" onClick={exportHTML}>Export as HTML</a>
            </div>

            <div id="parent-container">
                <div id="left-panel" />
                <div id="right-panel" />
            </div>
        </>
    );
}
