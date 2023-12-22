import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Upload, Button, message, Popconfirm, Image } from 'antd';
import dictionaryStore from '../../stores/dictionaryStore';
import { UploadOutlined } from '@ant-design/icons';
import {
    DeleteOutlined,
    CopyOutlined,
} from '@ant-design/icons';
import { copyToClipboard, formatFileSize } from '../../utils/Utility';

const ImageUploader = () => {
    const serverURL = import.meta.env.VITE_SERVER_URL;

    const [fileList, setFileList] = useState([]);
    //const [uploadedImages, setUploadedImages] = useState([]);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        fetchImageList();
    }, []);

    const fetchImageList = async () => {
        try {
            const response = await axios.get('/images');
            setImageList(response.data.data);

            console.log('images - response', response.data.data)
        } catch (error) {
            message.error(dictionaryStore.getString('something_went_wrong'));
        }
    };

    const handleCopyClick = (text) => {
        copyToClipboard(text, () => {
            message.success('copped');
        },
            () => {
                console.log("not copped");
            });

    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'path',
            key: 'path',
            sorter: (a, b) => a.path.localeCompare(b.path),
            render: (path) =>
                path &&
                <Image
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    data-imgurl={path}
                    width={40}
                    alt={path}
                    src={`${serverURL}/uploads/${path}`}
                />
        },
        {
            title: 'Name',
            dataIndex: 'size',
            render: (text, record) => (
                record.path
            ),
        },
        {
            title: 'Size',
            dataIndex: 'size',
            render: (text, record) => (
                <span>{formatFileSize(record.size)}</span>
            ),
        },
        {
            title: dictionaryStore.getString('actions'),
            dataIndex: '_id',
            render: (_id, record) => (
                <div>
                    <CopyOutlined onClick={() => {
                        handleCopyClick(record.path)
                    }} />

                    <Popconfirm
                        title={dictionaryStore.getString('are_you_sure_you_want_to_delete_this_image')}
                        onConfirm={() => handleDelete(record.path)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" >
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    /*
    const handleCopyUrl = (url) => {
        prompt(dictionaryStore.getString('copy_the_image_url'), url);
    };
    */

    const handleDelete = async (filename) => {
        try {
            await axios.delete(`/images/${filename}`);
            // Show a success message or update media list.
            message.success(dictionaryStore.getString('file_deleted_successfully'));
            // Refresh the image list after deletion
            fetchImageList();
        } catch (error) {
            message.error(dictionaryStore.getString('failed_to_delete_file'));
        }
    };

    const handleChange = (info) => {
        let fileList = [...info.fileList];

        // Remove successfully uploaded files
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        setFileList(fileList);
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        // Check if the file size is within the limit (1MB in bytes)
        const maxSize = 1 * 1024 * 1024; // 1MB in bytes
        if (file.size > maxSize) {
            message.error('File size limit exceeded');
            onError('File size limit exceeded'); // Pass an error message to the Ant Design Upload component
            return false; // Returning false prevents default upload behavior
        }

        try {
            const formData = new FormData();
            formData.append('files', file);

            // You can customize headers, etc., based on your needs
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            await axios.post(`${serverURL}/upload`, formData, config);
            message.success('File uploaded successfully');

            // Call onSuccess to indicate the successful upload
            onSuccess();

            // Fetch the updated image list after the upload is complete
            fetchImageList();

            // Returning false prevents default upload behavior
            return false;
        } catch (error) {
            message.error('Failed to upload file');
            onError('Failed to upload file'); // Pass an error message to the Ant Design Upload component
            return false; // Returning false prevents default upload behavior
        }
    };

    return (

        <div style={{ height: 'calc(100vh)', overflow: 'auto' }} className="content overflow-y-auto">
            <div className="p-8" style={{ width: 'calc(100%)', paddingLeft: 'calc(80px + 2rem)' }}>
                <div className="m-4">

                    <div style={{ padding: '15px' }}>
                        <Upload
                            customRequest={customRequest}
                            onChange={handleChange}
                            fileList={fileList}
                            multiple={true}
                            showUploadList={{
                                showPreviewIcon: true,
                                showRemoveIcon: true,
                                showDownloadIcon: true,
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>

                        <Table
                            dataSource={imageList.map(item => ({ ...item, key: item._id }))}
                            columns={columns}
                            sortOrder="ascend"
                            pagination={{
                                pageSize: 20,
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>



    );
};

export default ImageUploader;
