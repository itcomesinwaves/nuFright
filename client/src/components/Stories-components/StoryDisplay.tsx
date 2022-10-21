import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
//import text-to-speech component
import Voice from '../TextToSpeech-components/Voice.component';

const StoryDisplay = (props:{story:{createdAt:String, id:String, images:any, title:String, story:String, description?: String, author:{name:string}, likedBy:any}, backHandler:Function}) => {
    const currentUser = useSelector(selectCurrentUser);
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;
    const [username, setUsername] = useState(props.story.author.name);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.story.title);
    const [description, setDescription] = useState(props.story.description || '');
    const [story, setStory] = useState(props.story.story);
    const [sameUser, setSameUser] = useState(currentUser ? currentUser.name === props.story.author.name : false);
    const [editClicked, setEditClicked] = useState(false);
    const [isLiked, setIsLiked] = useState(props.story.likedBy.some((like:any) => currentUser ? like.userId === currentUser.id : false));

    //edit related
    const editButtonHandler = () => {
        setEditClicked(true);
        axios.patch('/api/story/editStory', {id: props.story.id, newStory: story, newDescription: description, user: currentUser.id})
        .then(result => {
            props.story.story = story;
            props.story.description = description;
            setIsEditing(!isEditing);
            setEditClicked(false); 
        })
        .catch(err => {
            console.error(err);
            setEditClicked(false);
        });
    };

    const editDescriptionInputHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const editStoryInputHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setStory(e.target.value);
    }

    const backToDisplayHandler = () => {
        setIsEditing(!isEditing);
        setStory(props.story.story);
        setDescription(props.story.description || '');
    }

    //like button handler
    const likeButtonHandler = () => {
        if(!isLiked) {
            axios.post('/api/likes/stories', {userId: currentUser.id, horrorId: props.story.id, isLiked: true})
            .then((result) => {
                setIsLiked(true);
            })
            .catch((err:Error) => {
                console.error(err);
            });
        } else {
            //find id of like from user
            let foundLike = props.story.likedBy.filter((like:any) => currentUser.id === like.userId);
            axios.delete(`/api/likes/${foundLike[0].id}`)
            .then(result => {
                setIsLiked(false);
            })
            .catch((err:Error) => {
                console.error(err);
            });
        }
    }

    return (
        <div className='row' style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="text-left" style={{display: 'inline-block', width: isEditing || !sameUser ? '100%' : '50%'}}>
                <button onClick={() => {!isEditing ? props.backHandler('storyList') : backToDisplayHandler()}} style={{ minWidth: 100, display: 'inline-block', background: 'black', color: 'lime', borderRadius: '45%', float: 'left' }}>Back</button>
            </div>
            {(currentUser ? currentUser.name : false) === props.story.author.name && !isEditing && <div className="text-right" style={{display: 'inline-block', width: '50%'}}><button style={{minWidth: 100, background: 'black', color: 'lime', borderRadius: '45%', float: 'right'}} onClick={() => setIsEditing(!isEditing)}>edit</button></div>}
            {!isEditing && <>
                <h5 style={{display: 'flex', justifyContent: 'center'}}><b><u>{title}</u></b></h5>
                <div className='col-6'>by: {username}</div>
                <div className='col-6' style={{display: 'flex', justifyContent: 'right'}}>published: {props.story.createdAt.slice(0, props.story.createdAt.indexOf('T'))}</div>
                <Voice text={story.toString()}></Voice>
                <img src={HauntedHouse} style={{maxWidth: 450, maxHeight: 450}}></img>
                <div className="row" style={{display: 'flex', justifyContent: 'left'}}>{story.split('\n').map((paragraph:string, index:number) => { return <p className="col-12" key={index}>{paragraph}</p> })}</div>
                {currentUser && <button onClick={likeButtonHandler} style={{maxWidth: 150, borderRadius: 50, background: 'black', color: 'lime'}}>{isLiked ? 'Unlike' : 'Like'}</button>}
            </>}
            {isEditing && <>
                <h5><b><u>{title}</u></b></h5>
                <textarea placeholder='description text' rows={3} value={description?.toString()} onChange={editDescriptionInputHandler} style={{borderColor: description.length > 300 ? 'red' : ''}}></textarea>
                <p>{description.length > 300 ? `You are ${description.length - 300} characters over the limit!` : ''}</p>
                <textarea placeholder="story text" rows={5} value={story.toString()} onChange={editStoryInputHandler} style={{borderColor: story.length > 10000 ? 'red' : ''}}></textarea>
                <p>{story.length > 10000 ? `You are ${story.length - 10000} characters over the limit!` : ''}</p>
                <div>{editClicked ? 'saving changes...' : ''}</div>
                <button disabled={editClicked} onClick={editButtonHandler} style={{ maxWidth: 120, borderRadius: '45%', background: 'black', color: 'lime' }}>Save Changes</button>
            </>}
        </div>
    )
}

export default StoryDisplay;