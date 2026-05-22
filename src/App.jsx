import { useState, useEffect, useRef } from "react";
import { Plane, Hotel, CreditCard, MapPin, Users, ArrowRight, ArrowLeft, Check, Star, Wallet, Globe, TrendingDown, Award, Zap, ChevronDown, ChevronUp, RotateCcw, Sparkles, Shield, Clock, AlertTriangle, IndianRupee } from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

*{box-sizing:border-box;margin:0;padding:0;}
body{background:#07070F;}
.cg{font-family:'Cormorant Garamond',serif;}
.dm{font-family:'DM Sans',sans-serif;}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer{0%{background-position:-300% center;}100%{background-position:300% center;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}

.fu{animation:fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;}
.fu1{animation-delay:0.05s;}
.fu2{animation-delay:0.12s;}
.fu3{animation-delay:0.19s;}
.fu4{animation-delay:0.26s;}
.fu5{animation-delay:0.33s;}
.fu6{animation-delay:0.40s;}

.gold-shimmer{
  background:linear-gradient(90deg,#B8842A 0%,#F0C96E 40%,#D4A853 60%,#B8842A 100%);
  background-size:300% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 4s linear infinite;
}
.gold-btn{
  background:linear-gradient(135deg,#C9952A 0%,#F5D07A 50%,#C9952A 100%);
  background-size:200% auto;
  color:#07070F;font-weight:600;cursor:pointer;
  border:none;transition:all 0.3s ease;
}
.gold-btn:hover{background-position:right center;box-shadow:0 4px 24px rgba(201,149,42,0.4);}
.gold-btn:disabled{opacity:0.4;cursor:not-allowed;}

.ghost-btn{
  background:transparent;color:rgba(240,237,230,0.5);
  border:1px solid rgba(255,255,255,0.1);cursor:pointer;
  transition:all 0.2s ease;
}
.ghost-btn:hover{color:rgba(240,237,230,0.85);border-color:rgba(255,255,255,0.25);}

.dark-card{
  background:#0E1020;
  border:1px solid rgba(255,255,255,0.07);
  transition:border-color 0.2s ease;
}
.dark-card:hover{border-color:rgba(201,149,42,0.25);}

.gold-card{
  background:#0E1020;
  border:1px solid rgba(201,149,42,0.35);
  box-shadow:0 0 20px rgba(201,149,42,0.06);
}

.tag-on{
  background:rgba(201,149,42,0.12);
  border:1px solid rgba(201,149,42,0.55);
  color:#F5D07A;cursor:pointer;
}
.tag-off{
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.1);
  color:rgba(240,237,230,0.45);cursor:pointer;
}
.tag-on:hover{background:rgba(201,149,42,0.18);}
.tag-off:hover{background:rgba(255,255,255,0.06);color:rgba(240,237,230,0.7);border-color:rgba(255,255,255,0.2);}

.input-field{
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.1);
  color:#F0EDE6;
  border-radius:8px;padding:10px 14px;
  width:100%;font-family:'DM Sans',sans-serif;font-size:14px;
  outline:none;transition:border-color 0.2s ease,box-shadow 0.2s ease;
  -webkit-appearance:none;
}
.input-field:focus{border-color:rgba(201,149,42,0.5);box-shadow:0 0 0 3px rgba(201,149,42,0.08);}
.input-field::placeholder{color:rgba(240,237,230,0.25);}
.input-field option{background:#0E1020;color:#F0EDE6;}

.counter-btn{
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
  color:#F0EDE6;width:32px;height:32px;border-radius:6px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-size:18px;
  transition:all 0.15s ease;user-select:none;
}
.counter-btn:hover{background:rgba(201,149,42,0.15);border-color:rgba(201,149,42,0.4);}

.radio-opt{
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.1);
  cursor:pointer;transition:all 0.2s ease;
}
.radio-opt.active{
  background:rgba(201,149,42,0.1);
  border-color:rgba(201,149,42,0.5);
}
.radio-opt:hover{border-color:rgba(201,149,42,0.3);}

.strategy-best{border:1px solid rgba(201,149,42,0.45);background:rgba(201,149,42,0.05);}
.strategy-other{border:1px solid rgba(255,255,255,0.08);background:#0E1020;}

.day-line{border-left:2px solid rgba(201,149,42,0.25);padding-left:20px;margin-left:10px;}
.spinner{animation:spin 0.8s linear infinite;}
.pulse-dot{animation:pulse 1.2s ease infinite;}

::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(201,149,42,0.25);border-radius:3px;}
`;

const CARDS = [
  {id:"hdfc_infinia",name:"HDFC Infinia",tag:"10X SmartBuy"},
  {id:"hdfc_diners",name:"HDFC Diners Black",tag:"5X Travel"},
  {id:"amex_plat",name:"Amex Platinum",tag:"MR Points"},
  {id:"amex_gold",name:"Amex Gold",tag:"MR Points"},
  {id:"axis_magnus",name:"Axis Magnus",tag:"Edge Miles"},
  {id:"axis_reserve",name:"Axis Reserve",tag:"Edge Miles"},
  {id:"icici_emerald",name:"ICICI Emerald",tag:"PAYBACK"},
  {id:"sbi_aurum",name:"SBI AURUM",tag:"Reward Pts"},
  {id:"yes_first",name:"YES First Exclusive",tag:"YES Rewardz"},
  {id:"sc_ultimate",name:"Standard Chartered Ultimate",tag:"5X Rewards"},
  {id:"kotak_white",name:"Kotak White Reserve",tag:"PVR+Travel"},
  {id:"rbl_world_safari",name:"RBL World Safari",tag:"Travel Pts"},
];

const LOYALTY = [
  {id:"air_india",name:"Air India Flying Returns",type:"airline"},
  {id:"indigo",name:"IndiGo 6E Rewards",type:"airline"},
  {id:"emirates",name:"Emirates Skywards",type:"airline"},
  {id:"singapore",name:"Singapore Airlines KrisFlyer",type:"airline"},
  {id:"british",name:"British Airways Avios",type:"airline"},
  {id:"qatar",name:"Qatar Airways Privilege Club",type:"airline"},
  {id:"marriott",name:"Marriott Bonvoy",type:"hotel"},
  {id:"ihg",name:"IHG One Rewards",type:"hotel"},
  {id:"taj",name:"Taj InnerCircle",type:"hotel"},
  {id:"oberoi",name:"Oberoi One",type:"hotel"},
  {id:"accor",name:"Accor Live Limitless",type:"hotel"},
  {id:"hyatt",name:"World of Hyatt",type:"hotel"},
];

const TRIP_STYLES = [
  {id:"relax",label:"Relax & Unwind",icon:"🌴"},
  {id:"culture",label:"Culture & Heritage",icon:"🏛"},
  {id:"adventure",label:"Adventure",icon:"⛰"},
  {id:"shopping",label:"Shopping",icon:"🛍"},
  {id:"family",label:"Family Fun",icon:"👨‍👩‍👧‍👦"},
  {id:"nightlife",label:"Nightlife",icon:"🎉"},
  {id:"food",label:"Food & Culinary",icon:"🍽"},
  {id:"romance",label:"Romance",icon:"💑"},
  {id:"wellness",label:"Wellness & Spa",icon:"🧘"},
  {id:"luxury",label:"Ultra Luxury",icon:"✨"},
];

const INR = (n) => "₹" + (n >= 100000 ? (n/100000).toFixed(1) + "L" : n >= 1000 ? Math.round(n/1000) + "K" : Math.round(n));
const INRFull = (n) => "₹" + Number(Math.round(n)).toLocaleString("en-IN");

function Label({children, sub}){
  return(
    <div style={{marginBottom:8}}>
      <p className="dm" style={{fontSize:13,fontWeight:500,color:"rgba(240,237,230,0.7)",letterSpacing:"0.04em",textTransform:"uppercase"}}>{children}</p>
      {sub && <p className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.35)",marginTop:2}}>{sub}</p>}
    </div>
  );
}

function GoldLine(){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,margin:"24px 0"}}>
      <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,rgba(201,149,42,0.3))"}}/>
      <div style={{width:4,height:4,borderRadius:"50%",background:"rgba(201,149,42,0.5)"}}/>
      <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(201,149,42,0.3),transparent)"}}/>
    </div>
  );
}

function Counter({val,min=0,max=10,onChange}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <button className="counter-btn" onClick={()=>val>min&&onChange(val-1)}>−</button>
      <span className="dm" style={{fontSize:16,fontWeight:500,minWidth:24,textAlign:"center",color:"#F0EDE6"}}>{val}</span>
      <button className="counter-btn" onClick={()=>val<max&&onChange(val+1)}>+</button>
    </div>
  );
}

function Tag({active,onClick,children}){
  return <button className={active?"tag-on":"tag-off"} onClick={onClick} style={{padding:"7px 14px",borderRadius:100,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"all 0.2s ease"}}>{children}</button>;
}

function StepHeader({icon:Icon,title,sub}){
  return(
    <div className="fu" style={{marginBottom:32}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
        <div style={{width:40,height:40,borderRadius:10,background:"rgba(201,149,42,0.12)",border:"1px solid rgba(201,149,42,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon size={20} color="#D4A853"/>
        </div>
        <h2 className="cg" style={{fontSize:28,fontWeight:500,color:"#F0EDE6",letterSpacing:"-0.01em"}}>{title}</h2>
      </div>
      <p className="dm" style={{fontSize:14,color:"rgba(240,237,230,0.45)",paddingLeft:52}}>{sub}</p>
    </div>
  );
}

// ── STEP 0: TRIP DETAILS ─────────────────────────────────────────
function TripDetails({form,set,next}){
  const valid = form.destination && form.startDate && form.endDate && form.startDate < form.endDate;
  const nights = form.startDate&&form.endDate ? Math.max(0,Math.round((new Date(form.endDate)-new Date(form.startDate))/(86400000))) : 0;

  return(
    <div>
      <StepHeader icon={Plane} title="Where are you headed?" sub="Tell us the basics — we'll handle the rest."/>

      <div className="dark-card fu fu1" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
          <div>
            <Label>Travelling From</Label>
            <input className="input-field" placeholder="City or airport" value={form.origin} onChange={e=>set("origin",e.target.value)}/>
          </div>
          <div>
            <Label>Destination</Label>
            <input className="input-field" placeholder="e.g. Dubai, Bali, Paris" value={form.destination} onChange={e=>set("destination",e.target.value)}/>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
          <div>
            <Label>Departure Date</Label>
            <input className="input-field" type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)}/>
          </div>
          <div>
            <Label>Return Date</Label>
            <input className="input-field" type="date" value={form.endDate} onChange={e=>set("endDate",e.target.value)}/>
          </div>
        </div>

        {nights>0 && (
          <div style={{background:"rgba(201,149,42,0.08)",border:"1px solid rgba(201,149,42,0.2)",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
            <Clock size={14} color="#D4A853"/>
            <span className="dm" style={{fontSize:13,color:"#D4A853"}}>{nights} nights · {nights+1} days</span>
          </div>
        )}
      </div>

      <div className="dark-card fu fu2" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label>Travelling Party</Label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {[["Adults","18+ years","adults",1,12],["Children","2–17 years","children",0,8],["Infants","Under 2","infants",0,4]].map(([l,s,k,mn,mx])=>(
            <div key={k} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:16,border:"1px solid rgba(255,255,255,0.07)"}}>
              <p className="dm" style={{fontSize:13,fontWeight:500,color:"rgba(240,237,230,0.7)",marginBottom:2}}>{l}</p>
              <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.3)",marginBottom:12}}>{s}</p>
              <Counter val={form[k]} min={mn} max={mx} onChange={v=>set(k,v)}/>
            </div>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu3" style={{borderRadius:16,padding:28,marginBottom:28}}>
        <Label sub="All-inclusive: flights, hotels, food, activities">Total Trip Budget (₹)</Label>
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"rgba(201,149,42,0.7)",fontSize:16,fontWeight:500,fontFamily:"'DM Sans',sans-serif"}}>₹</span>
          <input className="input-field" type="number" placeholder="e.g. 300000" value={form.budget} onChange={e=>set("budget",e.target.value)} style={{paddingLeft:32}}/>
        </div>
        {form.budget>0 && nights>0 && (
          <p className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.35)",marginTop:8}}>
            ≈ {INR(form.budget/Math.max(1,form.adults+form.children))} per person · {INR(form.budget/Math.max(1,nights))} per night
          </p>
        )}
      </div>

      <button className="gold-btn" onClick={next} disabled={!valid} style={{width:"100%",padding:"14px 24px",borderRadius:12,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        Continue to Preferences <ArrowRight size={16}/>
      </button>
    </div>
  );
}

// ── STEP 1: PREFERENCES ─────────────────────────────────────────
function Preferences({form,set,toggleArr,next,back}){
  const valid = form.tripStyles.length>0;
  return(
    <div>
      <StepHeader icon={Star} title="Your travel style" sub="Help us craft the perfect experience for your family."/>

      <div className="dark-card fu fu1" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label sub="Pick all that apply">Trip Vibe</Label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {TRIP_STYLES.map(s=>(
            <Tag key={s.id} active={form.tripStyles.includes(s.id)} onClick={()=>toggleArr("tripStyles",s.id)}>
              {s.icon} {s.label}
            </Tag>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu2" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label>Accommodation Standard</Label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {[
            {v:"budget",l:"3-Star / Budget",s:"Clean, functional stay"},
            {v:"4star",l:"4-Star Business",s:"Comfort & amenities"},
            {v:"5star",l:"5-Star Luxury",s:"Premium experience"},
            {v:"ultra",l:"Ultra-Luxury / Villa",s:"Suites, private villas"},
          ].map(o=>(
            <div key={o.v} className={`radio-opt${form.accommodation===o.v?" active":""}`} onClick={()=>set("accommodation",o.v)} style={{borderRadius:10,padding:"12px 16px",cursor:"pointer"}}>
              <p className="dm" style={{fontSize:13,fontWeight:500,color:"#F0EDE6"}}>{o.l}</p>
              <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)",marginTop:2}}>{o.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu3" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label>Flight Preference</Label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[
            {v:"economy",l:"Economy",s:"Best value"},
            {v:"premium",l:"Premium Economy",s:"Extra legroom"},
            {v:"business",l:"Business / First",s:"Full flat bed"},
          ].map(o=>(
            <div key={o.v} className={`radio-opt${form.flightClass===o.v?" active":""}`} onClick={()=>set("flightClass",o.v)} style={{borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"center"}}>
              <p className="dm" style={{fontSize:13,fontWeight:500,color:"#F0EDE6"}}>{o.l}</p>
              <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)",marginTop:2}}>{o.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu4" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label>Meal Preference</Label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {[["any","No Preference"],["veg","Pure Vegetarian"],["jain","Jain Food"],["nonveg","Non-Vegetarian"],["halal","Halal"]].map(([v,l])=>(
            <Tag key={v} active={form.mealPref===v} onClick={()=>set("mealPref",v)}>{l}</Tag>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu5" style={{borderRadius:16,padding:28,marginBottom:28}}>
        <Label sub="Pick your primary goal">What matters most?</Label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[
            {v:"max_savings",l:"Maximum Savings",icon:TrendingDown,s:"Squeeze every rupee"},
            {v:"best_rewards",l:"Best Rewards",icon:Award,s:"Points & status"},
            {v:"best_exp",l:"Best Experience",icon:Sparkles,s:"Seamless luxury"},
          ].map(o=>(
            <div key={o.v} className={`radio-opt${form.priority===o.v?" active":""}`} onClick={()=>set("priority",o.v)} style={{borderRadius:10,padding:"14px 16px",cursor:"pointer",textAlign:"center"}}>
              <o.icon size={18} color={form.priority===o.v?"#D4A853":"rgba(240,237,230,0.4)"} style={{margin:"0 auto 8px"}}/>
              <p className="dm" style={{fontSize:12,fontWeight:600,color:"#F0EDE6"}}>{o.l}</p>
              <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)",marginTop:2}}>{o.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:12}}>
        <button className="ghost-btn" onClick={back} style={{padding:"14px 24px",borderRadius:12,fontSize:15,display:"flex",alignItems:"center",gap:8}}>
          <ArrowLeft size={16}/> Back
        </button>
        <button className="gold-btn" onClick={next} disabled={!valid} style={{flex:1,padding:"14px 24px",borderRadius:12,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          Continue to Payment Arsenal <ArrowRight size={16}/>
        </button>
      </div>
    </div>
  );
}

// ── STEP 2: PAYMENT ARSENAL ─────────────────────────────────────
function PaymentArsenal({form,set,toggleArr,next,back,loading}){
  const airlineCards = LOYALTY.filter(l=>l.type==="airline");
  const hotelCards = LOYALTY.filter(l=>l.type==="hotel");

  return(
    <div>
      <StepHeader icon={CreditCard} title="Your payment arsenal" sub="The smarter we know your cards & points, the better we optimise."/>

      <div className="dark-card fu fu1" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label sub="Select all you own">Credit Cards</Label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {CARDS.map(c=>(
            <Tag key={c.id} active={form.cards.includes(c.id)} onClick={()=>toggleArr("cards",c.id)}>
              {c.name} <span style={{fontSize:11,opacity:0.65}}>· {c.tag}</span>
            </Tag>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu2" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label sub="Airline programs">Frequent Flyer Programmes</Label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {airlineCards.map(l=>(
            <Tag key={l.id} active={form.loyaltyPrograms.includes(l.id)} onClick={()=>toggleArr("loyaltyPrograms",l.id)}>{l.name}</Tag>
          ))}
        </div>
        <div style={{height:16}}/>
        <Label sub="Hotel programmes">Hotel Loyalty</Label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {hotelCards.map(l=>(
            <Tag key={l.id} active={form.loyaltyPrograms.includes(l.id)} onClick={()=>toggleArr("loyaltyPrograms",l.id)}>{l.name}</Tag>
          ))}
        </div>
      </div>

      <div className="dark-card fu fu3" style={{borderRadius:16,padding:28,marginBottom:16}}>
        <Label sub="Optional — helps calculate redemption value">Points & Miles Balance</Label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[
            ["HDFC Infinia / Diners Points","infiniaPoints","e.g. 50000"],
            ["Air India Flying Returns Miles","airIndiaMiles","e.g. 25000"],
            ["Emirates Skywards / Other Airline Miles","otherAirMiles","e.g. 15000"],
            ["Marriott Bonvoy / Hotel Points","hotelPoints","e.g. 40000"],
          ].map(([l,k,ph])=>(
            <div key={k}>
              <Label>{l}</Label>
              <input className="input-field" type="number" placeholder={ph} value={form[k]||""} onChange={e=>set(k,e.target.value)}/>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-card fu fu4" style={{borderRadius:16,padding:20,marginBottom:28,display:"flex",gap:14}}>
        <div style={{width:36,height:36,borderRadius:8,background:"rgba(201,149,42,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Zap size={18} color="#D4A853"/>
        </div>
        <div>
          <p className="dm" style={{fontSize:13,fontWeight:600,color:"#F5D07A",marginBottom:4}}>HDFC Infinia SmartBuy Advantage</p>
          <p className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.5)",lineHeight:1.6}}>SmartBuy offers <strong style={{color:"rgba(240,237,230,0.8)"}}>10X reward points</strong> on flights & hotels (capped). 1 point ≈ ₹1 on air redemption — effectively up to 33% return on travel bookings vs 3.3% base rate.</p>
        </div>
      </div>

      <div style={{display:"flex",gap:12}}>
        <button className="ghost-btn" onClick={back} style={{padding:"14px 24px",borderRadius:12,fontSize:15,display:"flex",alignItems:"center",gap:8}} disabled={loading}>
          <ArrowLeft size={16}/> Back
        </button>
        <button className="gold-btn" onClick={next} disabled={loading} style={{flex:1,padding:"14px 24px",borderRadius:12,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {loading ? <><div className="spinner" style={{width:16,height:16,border:"2px solid rgba(7,7,15,0.3)",borderTopColor:"#07070F",borderRadius:"50%"}}/> Crafting Your Plan…</> : <><Sparkles size={16}/> Generate My Smart Travel Plan</>}
        </button>
      </div>
    </div>
  );
}

// ── LOADING ───────────────────────────────────────────────────────
function Loading(){
  const msgs = ["Analysing your payment arsenal…","Calculating SmartBuy advantage…","Comparing booking strategies…","Crafting your personalised itinerary…"];
  const [i,setI] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setI(p=>(p+1)%msgs.length),2200);return()=>clearInterval(t);},[]);
  return(
    <div style={{textAlign:"center",padding:"80px 20px"}}>
      <div style={{width:64,height:64,borderRadius:16,background:"rgba(201,149,42,0.1)",border:"1px solid rgba(201,149,42,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
        <Globe size={28} color="#D4A853" className="spinner"/>
      </div>
      <h3 className="cg" style={{fontSize:24,fontWeight:400,color:"#F0EDE6",marginBottom:12}}>Building Your Journey</h3>
      <p className="dm" style={{fontSize:14,color:"rgba(240,237,230,0.45)"}} key={i}>{msgs[i]}</p>
    </div>
  );
}

// ── RESULTS ────────────────────────────────────────────────────────
function Results({result,form,onReset}){
  const [openDay,setOpenDay] = useState(0);
  if(result.error) return(
    <div style={{textAlign:"center",padding:60}}>
      <AlertTriangle size={32} color="#E24B4A" style={{margin:"0 auto 16px"}}/>
      <p className="dm" style={{color:"rgba(240,237,230,0.5)"}}>{result.error}</p>
      <button className="gold-btn" onClick={onReset} style={{marginTop:24,padding:"12px 28px",borderRadius:10,fontSize:14}}>Try Again</button>
    </div>
  );

  const nights = form.startDate&&form.endDate ? Math.max(0,Math.round((new Date(form.endDate)-new Date(form.startDate))/(86400000))) : 0;
  const bestStrategy = result.paymentStrategies?.[0];
  const otherStrategies = result.paymentStrategies?.slice(1)||[];

  return(
    <div>
      {/* HERO */}
      <div className="fu" style={{marginBottom:28,padding:"28px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{height:1,width:32,background:"rgba(201,149,42,0.5)"}}/>
          <span className="dm" style={{fontSize:11,fontWeight:600,letterSpacing:"0.12em",color:"rgba(201,149,42,0.7)",textTransform:"uppercase"}}>Your Smart Travel Plan</span>
        </div>
        <h1 className="cg" style={{fontSize:36,fontWeight:400,lineHeight:1.2,color:"#F0EDE6",marginBottom:12}}>{form.destination} <span className="gold-shimmer">Awaits</span></h1>
        <p className="dm" style={{fontSize:14,color:"rgba(240,237,230,0.5)",lineHeight:1.7,maxWidth:560}}>{result.headline}</p>
      </div>

      {/* BUDGET OVERVIEW */}
      {result.budgetAnalysis && (
        <div className="dark-card fu fu1" style={{borderRadius:16,padding:24,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
            <IndianRupee size={16} color="#D4A853"/>
            <h3 className="dm" style={{fontSize:13,fontWeight:600,color:"rgba(240,237,230,0.6)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Budget Breakdown</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
            {[
              {l:"Total Trip",v:result.budgetAnalysis.total,hi:true},
              {l:"Per Person",v:Math.round(result.budgetAnalysis.total/Math.max(1,form.adults+form.children))},
              {l:"Per Night",v:Math.round(result.budgetAnalysis.total/Math.max(1,nights))},
            ].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"14px 16px",border:`1px solid ${s.hi?"rgba(201,149,42,0.2)":"rgba(255,255,255,0.06)"}`}}>
                <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</p>
                <p className="dm" style={{fontSize:20,fontWeight:600,color:s.hi?"#F5D07A":"#F0EDE6"}}>{INRFull(s.v)}</p>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {Object.entries(result.budgetAnalysis.breakdown||{}).map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"rgba(255,255,255,0.02)",borderRadius:8}}>
                <span className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.4)",textTransform:"capitalize"}}>{k}</span>
                <span className="dm" style={{fontSize:12,fontWeight:500,color:"rgba(240,237,230,0.7)"}}>{INR(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BEST STRATEGY */}
      {bestStrategy && (
        <div className="fu fu2" style={{borderRadius:16,padding:24,marginBottom:12,background:"linear-gradient(135deg,rgba(201,149,42,0.08) 0%,rgba(201,149,42,0.03) 100%)",border:"1px solid rgba(201,149,42,0.4)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Award size={16} color="#D4A853"/>
              <h3 className="dm" style={{fontSize:13,fontWeight:600,color:"rgba(201,149,42,0.9)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Recommended Strategy</h3>
            </div>
            <span style={{background:"rgba(201,149,42,0.2)",border:"1px solid rgba(201,149,42,0.4)",color:"#F5D07A",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:100,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.08em"}}>Best Value</span>
          </div>
          <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:8}}>
            <h2 className="cg" style={{fontSize:26,fontWeight:500,color:"#F0EDE6"}}>{bestStrategy.method}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
            {[
              {l:"Flights",v:bestStrategy.flightCost},
              {l:"Hotels",v:bestStrategy.hotelCost},
              {l:"Effective Cost",v:bestStrategy.effectiveCost,hi:true},
              {l:"You Save",v:bestStrategy.savings,gold:true},
            ].map(s=>(
              <div key={s.l} style={{background:"rgba(7,7,15,0.4)",borderRadius:10,padding:"12px 14px"}}>
                <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</p>
                <p className="dm" style={{fontSize:16,fontWeight:600,color:s.gold?"#F5D07A":s.hi?"#F0EDE6":"rgba(240,237,230,0.8)"}}>{INRFull(s.v)}</p>
                {s.gold && bestStrategy.savingsPercent && <p className="dm" style={{fontSize:10,color:"rgba(245,208,122,0.6)",marginTop:2}}>{bestStrategy.savingsPercent.toFixed(1)}% saved</p>}
              </div>
            ))}
          </div>
          {bestStrategy.pointsEarned>0 && (
            <div style={{background:"rgba(201,149,42,0.06)",borderRadius:8,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"center"}}>
              <Sparkles size={13} color="#D4A853"/>
              <p className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.6)"}}>Earn <strong style={{color:"#F5D07A"}}>{Number(bestStrategy.pointsEarned).toLocaleString("en-IN")} pts</strong> worth <strong style={{color:"#F5D07A"}}>{INRFull(bestStrategy.pointsValue)}</strong> for future travel</p>
            </div>
          )}
          <p className="dm" style={{fontSize:13,color:"rgba(240,237,230,0.55)",lineHeight:1.7}}>{bestStrategy.howTo}</p>
          {bestStrategy.pros?.length>0 && (
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>
              {bestStrategy.pros.map((p,i)=>(
                <span key={i} style={{background:"rgba(30,180,90,0.08)",border:"1px solid rgba(30,180,90,0.2)",color:"rgba(100,220,130,0.8)",fontSize:11,padding:"4px 10px",borderRadius:100,fontFamily:"'DM Sans',sans-serif"}}>✓ {p}</span>
              ))}
              {bestStrategy.cons?.map((c,i)=>(
                <span key={"c"+i} style={{background:"rgba(230,80,80,0.07)",border:"1px solid rgba(230,80,80,0.15)",color:"rgba(230,130,130,0.8)",fontSize:11,padding:"4px 10px",borderRadius:100,fontFamily:"'DM Sans',sans-serif"}}>! {c}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* OTHER STRATEGIES */}
      {otherStrategies.length>0 && (
        <div className="fu fu3" style={{marginBottom:16}}>
          <p className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.35)",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600}}>Alternative Booking Methods</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {otherStrategies.map((s,i)=>(
              <div key={i} className="dark-card" style={{borderRadius:12,padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <p className="dm" style={{fontSize:13,fontWeight:500,color:"#F0EDE6",lineHeight:1.3}}>{s.method}</p>
                  {s.savings>0 && <span style={{background:"rgba(60,180,80,0.1)",color:"rgba(100,210,130,0.9)",fontSize:11,padding:"2px 8px",borderRadius:6,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",marginLeft:8}}>-{INR(s.savings)}</span>}
                </div>
                <p className="dm" style={{fontSize:18,fontWeight:600,color:"rgba(240,237,230,0.9)",marginBottom:6}}>{INRFull(s.effectiveCost||s.totalOutflow)}</p>
                <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.35)",lineHeight:1.5}}>{s.howTo?.substring(0,100)}…</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOTELS */}
      {result.hotelRecommendations?.length>0 && (
        <div className="dark-card fu fu4" style={{borderRadius:16,padding:24,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
            <Hotel size={16} color="#D4A853"/>
            <h3 className="dm" style={{fontSize:13,fontWeight:600,color:"rgba(240,237,230,0.6)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Recommended Hotels</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {result.hotelRecommendations.map((h,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.02)",borderRadius:10,padding:14,border:"1px solid rgba(255,255,255,0.06)"}}>
                <p className="dm" style={{fontSize:13,fontWeight:600,color:"#F0EDE6",marginBottom:4}}>{h.name}</p>
                <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)",marginBottom:8}}>{h.area}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span className="dm" style={{fontSize:14,fontWeight:600,color:"#F5D07A"}}>{INRFull(h.pricePerNight)}<span style={{fontSize:11,fontWeight:400,color:"rgba(240,237,230,0.4)"}}>/night</span></span>
                  <span style={{background:"rgba(201,149,42,0.1)",border:"1px solid rgba(201,149,42,0.25)",color:"rgba(201,149,42,0.8)",fontSize:10,padding:"2px 8px",borderRadius:6,fontFamily:"'DM Sans',sans-serif"}}>{h.bestBookingMethod}</span>
                </div>
                <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.35)",lineHeight:1.5}}>{h.whyRecommended}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ITINERARY */}
      {result.itinerary?.length>0 && (
        <div className="dark-card fu fu5" style={{borderRadius:16,padding:24,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
            <MapPin size={16} color="#D4A853"/>
            <h3 className="dm" style={{fontSize:13,fontWeight:600,color:"rgba(240,237,230,0.6)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Day-by-Day Itinerary</h3>
          </div>
          <div>
            {result.itinerary.map((day,i)=>(
              <div key={i} style={{marginBottom:8}}>
                <button onClick={()=>setOpenDay(openDay===i?-1:i)} style={{width:"100%",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.2s ease"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
                    <div style={{width:28,height:28,borderRadius:6,background:"rgba(201,149,42,0.12)",border:"1px solid rgba(201,149,42,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span className="dm" style={{fontSize:11,fontWeight:700,color:"#D4A853"}}>{i+1}</span>
                    </div>
                    <div>
                      <p className="dm" style={{fontSize:13,fontWeight:500,color:"#F0EDE6"}}>{day.title}</p>
                      <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)"}}>{day.date} {day.estimatedDayCost>0 && "· Est. "+INRFull(day.estimatedDayCost)}</p>
                    </div>
                  </div>
                  {openDay===i ? <ChevronUp size={14} color="rgba(240,237,230,0.4)"/> : <ChevronDown size={14} color="rgba(240,237,230,0.4)"/>}
                </button>
                {openDay===i && (
                  <div style={{background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.05)",borderTop:"none",borderRadius:"0 0 10px 10px",padding:16}}>
                    {day.activities?.map((a,j)=>(
                      <div key={j} style={{display:"flex",gap:12,marginBottom:12,paddingBottom:12,borderBottom:j<day.activities.length-1?"1px solid rgba(255,255,255,0.05)":"none"}}>
                        <div style={{flexShrink:0,textAlign:"right",width:44}}>
                          <p className="dm" style={{fontSize:11,color:"rgba(201,149,42,0.7)",fontWeight:500}}>{a.time}</p>
                        </div>
                        <div style={{flex:1}}>
                          <p className="dm" style={{fontSize:13,fontWeight:500,color:"#F0EDE6",marginBottom:2}}>{a.activity}</p>
                          <p className="dm" style={{fontSize:11,color:"rgba(240,237,230,0.4)"}}>{a.duration} {a.cost && "· "+a.cost}</p>
                          {a.tip && <p className="dm" style={{fontSize:11,color:"rgba(201,149,42,0.6)",marginTop:4}}>💡 {a.tip}</p>}
                        </div>
                      </div>
                    ))}
                    {day.meals && (
                      <div style={{marginTop:8,padding:"10px 12px",background:"rgba(201,149,42,0.04)",borderRadius:8,border:"1px solid rgba(201,149,42,0.12)"}}>
                        <p className="dm" style={{fontSize:11,fontWeight:600,color:"rgba(201,149,42,0.7)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>Meals</p>
                        {Object.entries(day.meals).map(([m,v])=>(
                          <p key={m} className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.5)",marginBottom:2}}><span style={{color:"rgba(240,237,230,0.35)",textTransform:"capitalize"}}>{m}:</span> {v}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKING ROADMAP */}
      {result.bookingRoadmap?.length>0 && (
        <div className="dark-card fu fu6" style={{borderRadius:16,padding:24,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
            <Shield size={16} color="#D4A853"/>
            <h3 className="dm" style={{fontSize:13,fontWeight:600,color:"rgba(240,237,230,0.6)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Booking Roadmap</h3>
          </div>
          <div>
            {result.bookingRoadmap.map((r,i)=>(
              <div key={i} style={{display:"flex",gap:14,marginBottom:16}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                  <div style={{width:28,height:28,borderRadius:6,background:"rgba(201,149,42,0.1)",border:"1px solid rgba(201,149,42,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span className="dm" style={{fontSize:11,fontWeight:700,color:"#D4A853"}}>{r.step}</span>
                  </div>
                  {i<result.bookingRoadmap.length-1 && <div style={{width:1,flex:1,background:"rgba(201,149,42,0.15)",marginTop:4}}/>}
                </div>
                <div style={{paddingBottom:16}}>
                  <p className="dm" style={{fontSize:13,fontWeight:500,color:"#F0EDE6",marginBottom:4}}>{r.action}</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>
                    <span style={{background:"rgba(255,255,255,0.05)",color:"rgba(240,237,230,0.5)",fontSize:11,padding:"2px 8px",borderRadius:4,fontFamily:"'DM Sans',sans-serif"}}>{r.when}</span>
                    {r.platform && <span style={{background:"rgba(201,149,42,0.08)",color:"rgba(201,149,42,0.7)",fontSize:11,padding:"2px 8px",borderRadius:4,fontFamily:"'DM Sans',sans-serif"}}>{r.platform}</span>}
                    {r.card && <span style={{background:"rgba(60,120,220,0.1)",color:"rgba(120,170,240,0.8)",fontSize:11,padding:"2px 8px",borderRadius:4,fontFamily:"'DM Sans',sans-serif"}}>{r.card}</span>}
                    {r.savings && <span style={{background:"rgba(40,180,90,0.08)",color:"rgba(80,200,120,0.8)",fontSize:11,padding:"2px 8px",borderRadius:4,fontFamily:"'DM Sans',sans-serif"}}>Saves {r.savings}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIPS + WARNINGS */}
      {(result.insiderTips?.length>0||result.warnings?.length>0) && (
        <div style={{display:"grid",gridTemplateColumns:result.warnings?.length?"1fr 1fr":"1fr",gap:12,marginBottom:24}}>
          {result.insiderTips?.length>0 && (
            <div className="dark-card" style={{borderRadius:14,padding:20}}>
              <p className="dm" style={{fontSize:12,fontWeight:700,color:"rgba(201,149,42,0.7)",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.08em"}}>Insider Tips</p>
              {result.insiderTips.map((t,i)=>(
                <p key={i} className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.5)",marginBottom:8,lineHeight:1.6,paddingLeft:12,borderLeft:"2px solid rgba(201,149,42,0.25)"}}>💡 {t}</p>
              ))}
            </div>
          )}
          {result.warnings?.length>0 && (
            <div style={{background:"rgba(230,80,50,0.04)",border:"1px solid rgba(230,80,50,0.15)",borderRadius:14,padding:20}}>
              <p className="dm" style={{fontSize:12,fontWeight:700,color:"rgba(230,100,80,0.7)",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.08em"}}>Watch Out</p>
              {result.warnings.map((w,i)=>(
                <p key={i} className="dm" style={{fontSize:12,color:"rgba(240,237,230,0.45)",marginBottom:8,lineHeight:1.6,paddingLeft:12,borderLeft:"2px solid rgba(230,80,50,0.25)"}}>⚠ {w}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <button className="ghost-btn" onClick={onReset} style={{width:"100%",padding:"13px 24px",borderRadius:12,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        <RotateCcw size={14}/> Plan Another Trip
      </button>
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────────
export default function App(){
  const [step,setStep] = useState(0);
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState(null);
  const topRef = useRef(null);

  const [form,setForm] = useState({
    origin:"Mumbai",destination:"",startDate:"",endDate:"",
    adults:2,children:0,infants:0,
    budget:"",
    tripStyles:[],accommodation:"5star",flightClass:"economy",mealPref:"any",priority:"max_savings",
    cards:["hdfc_infinia"],loyaltyPrograms:[],
    infiniaPoints:"",airIndiaMiles:"",otherAirMiles:"",hotelPoints:"",
  });

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleArr=(k,v)=>setForm(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}));

  const scrollTop=()=>setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth"}),50);

  const goNext=(n)=>{setStep(n);scrollTop();};

  const generate=async()=>{
    setLoading(true);
    scrollTop();
    const nights=form.startDate&&form.endDate?Math.max(0,Math.round((new Date(form.endDate)-new Date(form.startDate))/(86400000))):0;
    const selectedCards=CARDS.filter(c=>form.cards.includes(c.id)).map(c=>c.name);
    const selectedLoyalty=LOYALTY.filter(l=>form.loyaltyPrograms.includes(l.id)).map(l=>l.name);
    const styles=TRIP_STYLES.filter(s=>form.tripStyles.includes(s.id)).map(s=>s.label);
    const hasInfinia=form.cards.includes("hdfc_infinia");

    const prompt=`You are an elite travel concierge for affluent Indian families (HNI segment). Generate a comprehensive smart travel plan.

TRIP: ${form.origin} → ${form.destination}, ${nights} nights (${form.startDate} to ${form.endDate})
PARTY: ${form.adults} adults, ${form.children} children, ${form.infants} infants
BUDGET: ₹${form.budget} total
STYLE: ${styles.join(", ")||"General"} | ACCOMMODATION: ${form.accommodation} | FLIGHT CLASS: ${form.flightClass}
MEAL PREF: ${form.mealPref} | PRIORITY: ${form.priority}

CARDS: ${selectedCards.join(", ")||"Not specified"}
LOYALTY: ${selectedLoyalty.join(", ")||"None"}
HDFC INFINIA PTS: ${form.infiniaPoints||"unknown"} | AIR INDIA MILES: ${form.airIndiaMiles||"unknown"}
OTHER MILES: ${form.otherAirMiles||"unknown"} | HOTEL PTS: ${form.hotelPoints||"unknown"}

KEY CONTEXT FOR PAYMENT STRATEGIES:
- HDFC Infinia: 5 pts/₹150 base (3.3%). SmartBuy offers 10X on flights/hotels (capped ~15K pts/month on flights, higher on hotels). 1 pt ≈ ₹1 on air redemption/statement.
- Axis Magnus: Edge Miles transferable to airline partners (1 Edge Mile ≈ ₹1–2 in airline value). 12 miles/₹200.
- Amex Platinum: MR points transfer 1:1 to Singapore KrisFlyer, British Avios, Marriott etc.
- Air India FR miles: Good value for long haul redemptions, especially Star Alliance. 1 mile ≈ ₹0.5–1.5 depending on route.
- Always compare: direct airline portal + airline miles redemption, SmartBuy portal (HDFC), OTA (MakeMyTrip/Cleartrip) + cashback, direct hotel + hotel loyalty, SmartBuy hotel booking.

Respond with ONLY valid JSON (no markdown, no code blocks, no explanation outside JSON). Use this exact structure:
{
  "headline": "1-2 vivid sentences about this trip",
  "budgetAnalysis": {
    "total": <number>,
    "breakdown": {"flights":<n>,"accommodation":<n>,"activities":<n>,"food":<n>,"transfers":<n>,"misc":<n>},
    "perPersonPerDay": <number>
  },
  "paymentStrategies": [
    {
      "rank": 1,
      "method": "e.g. HDFC Infinia via SmartBuy",
      "flightCost": <number>,
      "hotelCost": <number>,
      "totalOutflow": <number>,
      "effectiveCost": <number>,
      "savings": <number>,
      "savingsPercent": <number>,
      "pointsEarned": <number>,
      "pointsValue": <number>,
      "howTo": "Concrete step-by-step: Book flights on hdfc.smartbuy.in using Infinia for 10X pts...",
      "pros": ["...", "..."],
      "cons": ["..."],
      "recommended": true
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "date": "Day 1 – [Date or Theme]",
      "title": "Arrival & First Impressions",
      "activities": [
        {"time":"14:00","activity":"Land at XYZ airport, private transfer to hotel","duration":"1.5hrs","cost":"₹X","tip":"Book transfer via hotel concierge for smooth entry"},
        {"time":"18:00","activity":"Check in, room upgrade tip","duration":"1hr","cost":"Included","tip":"Ask for higher floor at check-in"}
      ],
      "stay": "Hotel name, area",
      "meals": {"breakfast":"On flight","lunch":"At hotel","dinner":"Rooftop restaurant name, approx ₹X pp"},
      "estimatedDayCost": <number>
    }
  ],
  "hotelRecommendations": [
    {"name":"...","area":"...","pricePerNight":<n>,"loyaltyProgram":"Marriott Bonvoy","pointsEarnable":"3–5 pts/₹","bestBookingMethod":"Direct or SmartBuy","whyRecommended":"..."}
  ],
  "bookingRoadmap": [
    {"step":1,"action":"Set fare alert on Google Flights for ${form.origin}–${form.destination}","when":"Now","platform":"Google Flights","card":"","savings":"Spot price dips"},
    {"step":2,"action":"Book flight via HDFC SmartBuy (international flights section)","when":"60–90 days before","platform":"hdfc.smartbuy.in","card":"HDFC Infinia","savings":"₹X in pts"}
  ],
  "insiderTips": ["...", "...", "..."],
  "bestTimeToBook": "...",
  "warnings": ["Watch for dynamic currency conversion at hotels", "..."]
}

Be specific to Indian market: mention INR amounts, specific SmartBuy URLs, real Indian credit card benefits, Air India partner routes, Taj/Oberoi vs international chains etc. Make cost estimates realistic for ${form.destination} in ${form.flightClass} class from ${form.origin} for ${form.adults+form.children} people ${nights} nights on ₹${form.budget} budget. Generate exactly ${Math.min(nights,7)} itinerary days.`;

    try{
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if(!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY");
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.7,maxOutputTokens:4000}})
      });
      const data=await res.json();
      const text=data.candidates?.[0]?.content?.parts?.[0]?.text||"";
      const clean=text.replace(/```json\s*/gi,"").replace(/```\s*/gi,"").trim();
      const jsonStart=clean.indexOf("{");
      const jsonStr=jsonStart>=0?clean.substring(jsonStart):clean;
      const parsed=JSON.parse(jsonStr);
      setResult(parsed);
      setStep(3);
    }catch(e){
      console.error(e);
      setResult({error:"Could not generate your travel plan. Please check your inputs and try again."});
      setStep(3);
    }finally{
      setLoading(false);
    }
  };

  const STEPS=["Trip Details","Preferences","Payment Arsenal","Your Plan"];

  return(
    <>
      <style>{FONTS}</style>
      <div className="dm" ref={topRef} style={{minHeight:"100vh",background:"#07070F",color:"#F0EDE6",fontFamily:"'DM Sans',sans-serif"}}>

        {/* HEADER */}
        <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(7,7,15,0.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(201,149,42,0.12)",padding:"12px 24px"}}>
          <div style={{maxWidth:760,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#C9952A,#F5D07A)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Globe size={16} color="#07070F"/>
              </div>
              <div>
                <div className="cg" style={{fontSize:18,fontWeight:600,letterSpacing:"0.05em",color:"#F0EDE6",lineHeight:1}}>VOYAGE IQ</div>
                <div style={{fontSize:10,color:"rgba(240,237,230,0.35)",letterSpacing:"0.08em",textTransform:"uppercase"}}>Smart Travel · India</div>
              </div>
            </div>

            {step<3 && (
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,background:i<=step?"linear-gradient(135deg,#C9952A,#F5D07A)":"rgba(255,255,255,0.06)",color:i<=step?"#07070F":"rgba(240,237,230,0.3)",transition:"all 0.3s ease"}}>
                      {i<step?<Check size={11}/>:i+1}
                    </div>
                    {i<2 && <div style={{width:24,height:1,background:i<step?"rgba(201,149,42,0.5)":"rgba(255,255,255,0.08)",transition:"background 0.3s ease"}}/>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* MAIN */}
        <main style={{maxWidth:760,margin:"0 auto",padding:"40px 20px 80px"}}>
          {step===0 && !loading && <TripDetails form={form} set={set} next={()=>goNext(1)}/>}
          {step===1 && !loading && <Preferences form={form} set={set} toggleArr={toggleArr} next={()=>goNext(2)} back={()=>goNext(0)}/>}
          {step===2 && !loading && <PaymentArsenal form={form} set={set} toggleArr={toggleArr} next={generate} back={()=>goNext(1)} loading={loading}/>}
          {loading && <Loading/>}
          {step===3 && !loading && result && <Results result={result} form={form} onReset={()=>{setStep(0);setResult(null);scrollTop();}}/>}
        </main>
      </div>
    </>
  );
}
