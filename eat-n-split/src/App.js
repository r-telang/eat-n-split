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
  const [selectedFriend, setSelectedFriend] = useState();

  function handleShowAddFriend(){
    setShowAddFriend((show) => !showAddFriend);
  }

  function handleAddFriend(friend){
    setFriends(friends => [...friends,friend]);
    setShowAddFriend(false);
  }
  function handleSelectFriend(friend){
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {

    console.log(value);
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? 
      {...friend, balance: friend.balance + value} : friend));
    
  }

  return <div className="app">
    <div className="sidebar">
      <FriendsList 
      friends={friends} 
      onSelection={handleSelectFriend} 
      selectedFriend={selectedFriend}/>

      {showAddFriend && <FormAddFriend onAddfriend={handleAddFriend}/>}

      <Button 
        onClick={handleShowAddFriend}>
        {showAddFriend ?  "Close" : "Add Friend"}
        </Button>
    </div>

    {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill = {handleSplitBill}/>}

  </div>
 
}

function FriendsList({friends, onSelection, selectedFriend}) {

  // const friends =initialFriends;

  return ( 
  <ul>
    {friends.map((friend) => (
      <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
    ))}
  </ul>
  );
  
}

function Friend({friend,onSelection, selectedFriend}){

  const isSelected = selectedFriend?.id === friend.id;
  // console.log(friend.friend.name);
  return (
  
  <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <div>
      <h3>{friend.name}</h3>

      { friend.balance < 0 ? ( 
          <p className="red">
          you owe {friend.name} ${Math.abs(friend.balance)}
          </p>
          ): 
        friend.balance > 0 ? ( 
          <p className="green">
          you owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        ) :
        friend.balance === 0 && ( 
          <p>
          you and {friend.name} are even
          </p>
        )
      }

      <button className="button" onClick={() => onSelection(friend)}>{isSelected ? "Close": "Select"}</button>
    </div>
  </li>
  );
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

function FormSplitBill({selectedFriend, onSplitBill}) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying,setWhoIsPaying] = useState("user");

  function handleSubmit(e){
    e.preventDefault();

    if(!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
  <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split bill with {selectedFriend.name}</h2>
    <label>💸 Total Bill Amount</label>
    <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>
    <label>👤 Your expense</label>
    <input type="number" value={paidByUser} 
    onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}/>
    <label>👫 Split With {selectedFriend.name}</label>
    <input type="text" disabled value={paidByFriend}/>
    <label>💬 Who's Payin</label>
    <select 
    value={whoIsPaying} 
    onChange={(e) => setWhoIsPaying(e.target.value)}
    >
      <option value='user'>you</option>
      <option value='friend'>{selectedFriend.name}</option>
    </select>
    <Button>Split Bill</Button>
  </form>
  );
}