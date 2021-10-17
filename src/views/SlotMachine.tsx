import React, { useState, useEffect, useCallback, useRef } from "react";
//helpers&config
import {
  getRandomNumber,
  convertFruitTextToEmoji,
  slotMachineRewardRules,
} from "../helpers";
import { SLOT_MACHINE, REELS_SPINNING_TIMER } from "../config";
//style
import "./style/SlotMachine.css";
//modal rules
import ModalRules from "../components/ModalRules";

//init the timer for the timer of the spinning reel
let spinReelTimer: any = null;
//convert SLOT_MACHINE obj to a map to get dinamically the name of properties
const slotMachineMap = new Map(Object.entries(SLOT_MACHINE));
//init the interval for the blinking spin button animation
let spinningDisplayInterval: any;

const SlotMachine = () => {
  const showSpin: any = useRef();

  //State
  const [reels, setReels] = useState({
    reel1: SLOT_MACHINE.reel1[0],
    reel2: SLOT_MACHINE.reel2[1],
    reel3: SLOT_MACHINE.reel3[2],
  });
  const [coins, setCoins] = useState(20);
  const [rolling, setRolling] = useState(false);

  const [showRules, setShowRules] = useState(false);

  const [spinTimer, setSpinTimer] = useState(REELS_SPINNING_TIMER);
  const [letReelSpin, setLetReelSpin] = useState({
    reel1: false,
    reel2: false,
    reel3: false,
    finish: false,
  });
  const [spinReelTurn, setSpinReelTurn] = useState({
    current: "",
    next: "",
  });

  const [displaySpin, setDisplaySpin] = useState(false);
  //Functions
  //function to set reel result with a timer for every reel
  const spinningReel = useCallback((reel: string) => {
    spinReelTimer = setTimeout(() => {
      setReels((prevState: any) => {
        //set slot machine value for every reel with a randmon number
        return {
          ...prevState,
          [reel]: slotMachineMap.get(reel)?.[getRandomNumber(4, 0)],
        };
      });
      //spiner timer for know when to stop
      setSpinTimer((prevState: any) => prevState - 1);
    }, 120);
  }, []);

  //function to start the spinning of the reel
  const spin = () => {
    //decrease one coin for every spin
    setCoins((prevState: any) => prevState - 1);
    setRolling(true);
    setDisplaySpin(true);
    //set the reel 1 to spin
    setLetReelSpin((prevState: any) => {
      return { ...prevState, reel1: true };
    });
  };

  const spinDisplayAnimation = () => {
    //spin blinking animation for the button
    showSpin.current = !showSpin.current;
    setDisplaySpin(showSpin.current);
  };

  //Sides Effects
  useEffect(() => {
    //the reel effect, when one reel finish the spinning, is the turn of the other
    if (letReelSpin.reel1) {
      spinningReel("reel1");
      setSpinReelTurn({ current: "reel1", next: "reel2" });
    }
    if (letReelSpin.reel2) {
      spinningReel("reel2");
      setSpinReelTurn({ current: "reel2", next: "reel3" });
    }
    if (letReelSpin.reel3) {
      spinningReel("reel3");
      setSpinReelTurn({ current: "reel3", next: "finish" });
    }
    if (letReelSpin.finish) {
      //when is finish send the reels value result for gain coins
      const winCoins = slotMachineRewardRules(reels);
      setCoins((prevState: any) => prevState + winCoins);
      setRolling(false);
      setLetReelSpin((prevState: any) => {
        return { ...prevState, finish: false };
      });
    }
  }, [letReelSpin, reels, spinningReel]);

  useEffect(() => {
    //when the spinning time of a reel end, pass to the another reel
    if (spinTimer === 0) {
      clearTimeout(spinReelTimer);
      setLetReelSpin((prevState: any) => {
        return {
          ...prevState,
          [spinReelTurn.current]: false,
          [spinReelTurn.next]: true,
        };
      });
      setSpinTimer(REELS_SPINNING_TIMER);
    }
  }, [spinTimer, spinReelTurn]);

  //interval for the blinking spin button effect
  useEffect(() => {
    spinningDisplayInterval = setInterval(spinDisplayAnimation, 400);
    return () => {
      clearInterval(spinningDisplayInterval);
    };
  }, []);

  return (
    <div>
      <ModalRules
        showModal={showRules}
        handleCloseModal={() => setShowRules(false)}
      />
      <div className="slot-machine metal linear">
        <h5>🎰Slot Machine</h5>
        <div className="slot-machine-reels ">
          <span className={letReelSpin.reel1 ? "active-reel" : ""}>
            {convertFruitTextToEmoji(reels.reel1)}
          </span>
          <span className={letReelSpin.reel2 ? "active-reel" : ""}>
            {convertFruitTextToEmoji(reels.reel2)}
          </span>
          <span className={letReelSpin.reel3 ? "active-reel" : ""}>
            {convertFruitTextToEmoji(reels.reel3)}
          </span>
        </div>
        <div className="slot-machine-coins-container">
          <span>{coins.toString().padStart(7, "0")}</span>
        </div>
        <div className="slot-machine-rules-btn-container">
          <button
            className="metal linear rules-btn"
            disabled={rolling}
            onClick={() => setShowRules(true)}
          >
            Rules
          </button>
        </div>
        <div className="slot-machine-spin-btn-container">
          <button
            className="metal linear"
            disabled={coins === 0 || rolling}
            onClick={spin}
          >
            {displaySpin && !rolling ? "" : "Spin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
