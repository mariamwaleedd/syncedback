import React from 'react';
import { 
    Bold, Italic, Strikethrough, Heading1, Heading2, 
    Heading3, Pencil, Code, Link as LinkIcon, Image, Search as SearchTool
} from 'lucide-react';
import './RichTextToolbar.css';

const RichTextToolbar = () => {
    return (
        <div className="rich-text-toolbar">
            <div className="toolbar-group">
                <button type="button" className="toolbar-btn" title="Bold"><Bold size={16} /></button>
                <button type="button" className="toolbar-btn" title="Italic"><Italic size={16} /></button>
                <button type="button" className="toolbar-btn" title="Strikethrough"><Strikethrough size={16} /></button>
            </div>
            
            <div className="toolbar-sep" />
            
            <div className="toolbar-group">
                <button type="button" className="toolbar-btn" title="Heading 1"><Heading1 size={16} /></button>
                <button type="button" className="toolbar-btn" title="Heading 2"><Heading2 size={16} /></button>
                <button type="button" className="toolbar-btn" title="Heading 3"><Heading3 size={16} /></button>
            </div>
            
            <div className="toolbar-sep" />
            
            <div className="toolbar-group">
                <button type="button" className="toolbar-btn" title="Edit"><Pencil size={16} /></button>
                <button type="button" className="toolbar-btn" title="Code"><Code size={16} /></button>
                <button type="button" className="toolbar-btn" title="Link"><LinkIcon size={16} /></button> 
                <button type="button" className="toolbar-btn" title="Image"><Image size={16} /></button> 
                <button type="button" className="toolbar-btn" title="Search"><SearchTool size={16} /></button>
            </div>
        </div>
    );
};

export default RichTextToolbar;
