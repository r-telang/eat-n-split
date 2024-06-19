import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({children, onClick})
{
  return <button className="button" onClick={onClick}>{children}</button>;

}
export default function App(){
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend(){
    setShowAddFriend((show) => !showAddFriend);
  }

  function handleAddFriend(friend){
    setFriends(friends => [...friends,friend]);
    setShowAddFriend(false);
  }


  return <div className="app">
    <div className="sidebar">
      <FriendsList friends={friends}/>
      {showAddFriend && <FormAddFriend onAddfriend={handleAddFriend}/>}
      <Button onClick={handleShowAddFriend}>{showAddFriend ?  "Close" : "Add Friend"}</Button>
    </div>
    <FormSplitBill/>
  </div>
 
}

function FriendsList({friends}) {

  // const friends =initialFriends;

  return ( 
  <ul>
    {friends.map((friend) => (
      <Friend friend={friend} key={friend.id}/>
    ))}
  </ul>
  );
  
}

function Friend(friend){
  return (
  <li>
    <img src={friend.image} alt={friend.name} />
    <div>
      <h3>{friend.name}</h3>
      {/* {friend.balance < 0 && ( 
        <p className="red">
        you owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && ( 
        <p className="green">
        you owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && ( 
        <p>
        you and {friend.name} are even
        </p>
      )} */}

      {friend.balance < 0 ? ( 
        <p className="red">
        you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
        ): 
      friend.balance > 0 ? ( 
        <p className="green">
        you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      ) :
      friend.balance === 0 && ( 
        <p>
        you and {friend.name} are even
        </p>
      )
      }

      <button className="button">select </button>
    </div>
  </li>);
}


function FormAddFriend({onAddfriend}){

  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');


  function handleSubmit(e){
    e.preventDefault();
    
    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name, 
      image: `${image}?=${id}`,
      balance: 0,
    }
    onAddfriend(newFriend);
;
    setName('')
    setImage("https://i.pravatar.cc/48");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🙋‍♂️ Friend Name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
    <label>📷 Image URL</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
    <Button>Add</Button>
  </form>
}

function FormSplitBill() {
  return (
  <form className="form-split-bill">
    <h2>Split the bill</h2>
    <label>💸 Total Bill Amount</label>
    <input type="number"/>
    <label>👤 Your expense</label>
    <input type="number"/>
    <label>👫 Split With</label>
    <input type="text" disabled/>
    <label>💬 Who's Payin</label>
    <select>
      <option value='user'>you</option>
      <option value='friend'>X</option>
    </select>
    <Button>Split Bill</Button>
  </form>
  );
}