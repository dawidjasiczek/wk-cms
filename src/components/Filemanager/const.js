
export const icons = {
    v: "file-video",
    i: "file-image",
    a: "file-audio",
    excell: "file-excel",
    doc: "file-word",
    pdf: "file-pdf",
    txt: "file-alt",
    zip: "file-archive",
    pp: "file-powerpoint",
    other: "file"

    }
export const exts = {
    "aac": "a",
    "abw": "other",
    "arc": "other",
    "avi": "v",
    "azw": "other",
    "bin": "other",
    "bmp": "i",
    "bz": "zip",
    "bz2": "zip",
    "doc": "doc",
    "docx": "doc",
    "epub": "other",
    "gz": "zip",
    "gif": "i",
    "ico": "i",
    "jpg": "i",
    "jpeg": "i",
    "mid": "a",
    "mp3": "a",
    "mpeg": "v",
    "odp": "pp",
    "ods": "excell",
    "oga": "a",
    "ogv": "v",
    "ogg": "other",
    "opus": "a",
    "png": "i",
    "pdf": "pdf",
    "ppt": "pp",
    "pptx": "pp",
    "rar": "zip",
    "rtf": "doc",
    "svg": "i",
    "swf": "other",
    "tar": "zip",
    "tif": "i",
    "tiff": "i",
    "ttf": "other",
    "txt": "txt",
    "vsd": "other",
    "wav": "a",
    "weba": "a",
    "webm": "v",
    "webp": "i",
    "woff": "other",
    "woff2": "other",
    "xls": "excell",
    "xlsx": "excell",
    "zip": "zip",
    "3gp": "v",
    "3g2": "v",
    "7z": "zip"
    }
export const FileContextMenuOptions = [
    {
        name: "Zmień nazwę pliku",
        slug: "rename"
    },
    {
        name: "Przenieś do folderu",
        slug: "move"
    },
    
    {
        name: "Stwórz nowy folder",
        slug: "mkdir"
    },
    {
        type: 'divider'
    },
    {
        name: "Otwórz w nowej karcie",
        slug: "open_in_new_tab"
    },
    {
        name: "Skopiuj link do udostępniania",
        slug: "copy_url"
    },
    // {
    //     name: "Skopiuj ścieżka",
    //     slug: "copy_path"
    // },
    {
        name: "Pobierz",
        slug: "download"
    },
    {
        type: 'divider'
    },
    {
        name: "Usuń",
        slug: "delete"
    },
    
]
export const DirContextMenuOptions = [
    {
        name: "Zmień nazwę folderu",
        slug: "rename"
    },
    {
        name: "Stwórz nowy folder",
        slug: "mkdir"
    },
    {
        type: 'divider'
    },
    {
        name: "Usuń",
        slug: "delete"
    }
    
]
export const WhiteContextMenuOptions = [
    {
        name: "Stwórz nowy folder",
        slug: "mkdir"
    },
    {
        name: "Wgraj plik",
        slug: "mkdir"
    }
    
]
export const file_name_reg = /^[A-Za-z0-9ĄĆĘŁŃÓŚŻŹąćęłńóśżźÁČĎÉĚÍŇŘŠŤÚŮÝŽáčďéěíňřšťúůýž_\-\!\@\#\%\^\&\*\(\)\+\=\|\;\:\,\.\?\`\~\— ]*$/
export const dir_name_reg = /^[A-Za-z0-9ĄĆĘŁŃÓŚŻŹąćęłńóśżźÁČĎÉĚÍŇŘŠŤÚŮÝŽáčďéěíňřšťúůýž_\-\!\@\#\%\^\&\*\(\)\+\=\|\;\:\,\.\?\`\~\— ]*$/