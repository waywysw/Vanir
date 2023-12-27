import { useState, useEffect } from 'react';

const HomePage = () => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [caption, setCaption] = useState('')
    const [showBigImage, setShowBigImage] = useState<boolean>(false)

    useEffect(() => {
        fetch('/api/data-folder/scan')
            .then(response => response.json())
            .then(data => setFolders(data))
            .catch(error => console.error('Error fetching folders:', error));
    }, []);

    const handleFolderClick = (folderName: string) => {
        setSelectedFolder(folderName);
        fetch(`/api/folder/${folderName}`)
            .then(response => response.json())
            .then(data => {
                setImage(data.imageUrl);
                setTags(data.tags.join(', '));
                setCaption(data.caption);
            })
            .catch(error => console.error('Error fetching folder data:', error));
    };

    const saveTags = (folderName: string, updatedTags: string) => {
        fetch(`/api/folder/${folderName}/save-tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: updatedTags }),
        })
        .then(response => response.json())
        .then(data => console.log('Tags saved:', data))
        .catch(error => console.error('Error saving tags:', error));
    };

    const saveCaption = (folderName: string, newCaption: string) => {
        fetch(`/api/folder/${folderName}/save-caption`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: newCaption }),
        })
        .then(response => response.json())
        .then(data => console.log('Tags saved:', data))
        .catch(error => console.error('Error saving tags:', error));
    };

    return (
        <>
            {showBigImage && (
                <div className='w-100vw h-100vh bg-black opacity-50 flex flex-col justify-center items-center'>
                    
                </div>
            )}
            <div className='w-full h-[90vh] flex flex-col justify-center items-center gap-2 md:p-4 text-base-content'>
                <div className='rounded-box w-full h-full bg-base-300 p-4 flex flex-col md:flex-row gap-2'>
                    <div className='bg-base-200 p-2 md:w-1/2 h-full min-h-[30vh] overflow-y-scroll gap-2 flex flex-col'>
                        <h3 className='font-semibold mb-2'>Folders</h3>
                        {folders.map(folder => {
                            return (
                                <span
                                className='dy-btn dy-btn-primary line-clamp-1 max-w-full text-center items-center flex flex-row justify-between'
                                key={folder.name}
                                onClick={() => handleFolderClick(folder.name)}>
                                {folder.name}
                                {folder.hasCaption && <span className="text-green-500 ml-2">✔</span>}
                                </span>
                            )
                        })}
                    </div>
                    {selectedFolder && (
                        <div className='bg-base-200 p-2 md:w-1/2 flex flex-col md:flex-row gap-2'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-semibold mb-2'>{selectedFolder}</h3>
                                <img src={image} alt="Selected" className='rounded-box max-w-96 object-cover'/>
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <label>Tags</label>
                                <textarea
                                    className='dy-textarea dy-textarea-bordered'
                                    value={tags} 
                                    onChange={(e) => setTags(e.target.value)}
                                />
                                <button onClick={() => saveTags(selectedFolder, tags)} className='dy-btn dy-btn-primary'>Save Tags</button>
                                <label>Caption</label>
                                <textarea
                                    className='dy-textarea dy-textarea-bordered'
                                    value={caption} 
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                                <button onClick={() => saveCaption(selectedFolder, caption)} className='dy-btn dy-btn-primary'>Save Caption</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomePage;
