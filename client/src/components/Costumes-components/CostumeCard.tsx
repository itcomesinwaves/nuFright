import React, { useState } from 'react';

const CostumeCard = (props:{name:string, url:string, costumeImg:string, costumeImg_url:string}) => {
    const [isHover, setHover] = useState(false);
    const replacementImg = require('../../../../assets/Hauntware-logo-prototype.png').default;
    const replacementImg2 = require('../../../../assets/face.png').default;
    
    return (
        <div className="col-sm-3">
            <div className="card" style={{width: '17rem', background: 'rgb(220, 53, 69)', margin: 5}}>
                <img className="card-img-top" src={!props.costumeImg.includes('https://spirit.scene7.com/is/image/Spirit/') ? Math.floor(Math.random() * 1000) + 1 !== 1 ? replacementImg : replacementImg2 : props.costumeImg} alt="Card image cap"></img>
                <div className="card-body">
                    <a className="card-title" href={props.url} target='_blank' rel="noreferrer" style={{textDecoration: 'none', color: 'white', fontWeight: isHover ? 'bold' : 'normal'}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{props.name}</a>
                </div>
            </div>
        </div>
    )
}

export default CostumeCard