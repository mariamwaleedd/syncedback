import React from 'react';
import { 
    Bold, Italic, Strikethrough, Heading1, Heading2, 
    Heading3, Pencil, Code, Link as LinkIcon, Image, Search as SearchTool
} from 'lucide-react';

const RichTextToolbar = () => {
    return (
        <div className="rich-text-toolbar">
            <Bold size={16} /> <Italic size={16} /> <Strikethrough size={16} />
            <div className="toolbar-sep" />
            <Heading1 size={16} /> <Heading2 size={16} /> <Heading3 size={16} />
            <div className="toolbar-sep" />
            <Pencil size={16} /> <Code size={16} /> <LinkIcon size={16} /> 
            <Image size={16} /> <SearchTool size={16} />
        </div>
    );
};

export default RichTextToolbar;
