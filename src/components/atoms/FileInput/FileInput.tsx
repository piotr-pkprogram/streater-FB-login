import React, { useEffect, useRef, useState } from 'react';
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon
} from './FileInput.styles';
import { ChangeInputEvent } from 'types/FormTypes';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  updateFilesCb: (filesAsArray: Array<File>) => void;
  imageFile?: File;
  maxFileSizeInBytes?: number;
  style?: object;
}

const convertBytesToKB = (bytes: number) => Math.round(bytes / 1000);

const FileInput = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = 500000,
  style,
  imageFile,
  ...otherProps
}: Props) => {
  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState({});
  const [inputDisabled, setInputDisabled] = useState(false);
  let amountOfFiles = 0;

  useEffect(() => {
    if (imageFile) {
      // @ts-ignore
      files[imageFile.name] = imageFile;
    }
  }, []);

  useEffect(() => {
    for (const key in files) {
      if (files.hasOwnProperty(key)) ++amountOfFiles;
    }
    /*@ts-ignore*/
    setInputDisabled(otherProps.multiple ? false : amountOfFiles == 1);
  }, [files]);

  const handleUploadBtnClick = () => {
    fileInputField?.current?.click();
  };

  const addNewFiles = (newFiles: FileList) => {
    for (let file of Array.from(newFiles)) {
      if (file.size <= maxFileSizeInBytes) {
        //@ts-ignore
        if (!otherProps.multiple) {
          return { file };
        }
        // @ts-ignore
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const convertNestedObjectToArray = (nestedObj: object) =>
    // @ts-ignore
    Object.keys(nestedObj).map((key) => nestedObj[key]);

  const callUpdateFilesCb = (files: object) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e: ChangeInputEvent) => {
    e.preventDefault();
    const { files: newFiles } = e.target;
    if (newFiles?.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles as FileList);
    }
  };

  const removeFile = (fileName: string) => {
    // @ts-ignore
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };
  return (
    <>
      <FileUploadContainer style={style}>
        <DragDropText inputDisabled={inputDisabled}>{label}</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick} inputDisabled={inputDisabled}>
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/*<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->*/}
              <path
                fill="#FFFFFF"
                d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z"
              />
            </svg>
          </i>
          {/*@ts-ignore*/}
          <span> Upload {otherProps.multiple ? 'files' : 'a file'}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          disabled={inputDisabled}
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <PreviewList>
          {Object.keys(files).map((fileName) => {
            //@ts-ignore
            let file = files[fileName];
            return (
              <PreviewContainer key={fileName}>
                <div className="relative grid">
                  <ImagePreview src={URL.createObjectURL(file)} alt={`file preview ${file.name}`} />
                  <FileMetaData>
                    <span title={file.name}>
                      {file.name.length < 11 ? file.name : `${file.name.slice(0, 11)} ...`}
                    </span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon onClick={() => removeFile(fileName)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          height={25}
                          fill="#FFFFFF"
                        >
                          {/*<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->*/}
                          <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                        </svg>
                      </RemoveFileIcon>
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default FileInput;
