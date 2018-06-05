import assert from 'assert';
import {initialState, setTime, setLives, countPoints} from "./data";


describe(`Game`, () => {
  describe(`#Set time`, () => {
    describe(`Invalid data`, () => {
      const checkTime = (state, time) => {
        setTime(state, time);
      };

      it(`should throw Error with incorrect parameters`, () => {
        const incorrectTimeParameters = (state, time) => {
          checkTime(state, time);
        };
        assert.throws(() => {
          incorrectTimeParameters(initialState, false);
        }, Error);

        assert.throws(() => {
          incorrectTimeParameters({}, 2);
        }, Error);

        assert.throws(() => {
          incorrectTimeParameters([], 20);
        }, Error);

        assert.throws(() => {
          incorrectTimeParameters(NaN, 20);
        }, Error);

        assert.throws(() => {
          incorrectTimeParameters(null, 23);
        }, Error);

        assert.throws(() => {
          incorrectTimeParameters(initialState, `string`);
        }, Error);
      });

      it(`should throw Error with range of time value`, () => {
        const incorrectTimeValue = (state, time) => {
          setTime(state, time);
        };

        assert.throws(() => {
          incorrectTimeValue(initialState, 35);
        }, RangeError);

        assert.throws(() => {
          incorrectTimeValue(initialState, -1);
        }, RangeError);
      });
    });

    describe(`Valid data`, () => {
      it(`should set new time value with correct parameters`, () => {
        assert.equal(setTime(initialState, 12).time, 12);
        assert.equal(setTime(initialState, 20).time, 20);
        assert.equal(setTime(initialState, 30).time, 30);
        assert.equal(setTime(initialState, 0).time, 0);
      });

      it(`Check initial state value of time`, () => {
        assert.equal(initialState.time, 30);
      });
    });
  });

  describe(`#Set lives`, () => {
    describe(`Invalid data`, () => {
      const incorrectLivesValue = (state, lives) => {
        setLives(state, lives);
      };

      it(`should throw Error with incorrect parameters`, () => {
        assert.throws(() => {
          incorrectLivesValue(initialState, `string`);
        }, TypeError);

        assert.throws(() => {
          incorrectLivesValue({}, 0);
        }, TypeError);

        assert.throws(() => {
          incorrectLivesValue([], 2);
        }, TypeError);

        assert.throws(() => {
          incorrectLivesValue(initialState, null);
        }, TypeError);
      });

      it(`should throw Error with range of lives value`, () => {
        assert.throws(() => {
          incorrectLivesValue(initialState, -1);
        }, RangeError);

        assert.throws(() => {
          incorrectLivesValue(initialState, 4);
        }, RangeError);

        assert.throws(() => {
          incorrectLivesValue(initialState, 8);
        }, RangeError);
      });
    });

    describe(`Valid data`, () => {
      it(`should set new lives value with correct parameters`, () => {
        assert.equal(setLives(initialState, 0).lives, 0);
        assert.equal(setLives(initialState, 1).lives, 1);
        assert.equal(setLives(initialState, 3).lives, 3);
      });

      it(`Check initial state value of lives`, () => {
        assert.equal(initialState.lives, 3);
      });
    });
  });

  describe(`#Count points`, () => {
    describe(`Correct answer`, () => {
      it(`should add 100 points for correct answer (between 10 and 20 sec)`, () => {
        assert.equal(countPoints(`correct`), 100);
      });

      it(`should add 50 points for slow answer (between 20 and 30 sec)`, () => {
        assert.equal(countPoints(`slow`), 50);
      });

      it(`should add 150 points for fast answer (between 0 and 10 sec)`, () => {
        assert.equal(countPoints(`fast`), 150);
      });
    });

    describe(`Incorrect answer`, () => {
      it(`shouldn't add points`, () => {
        assert.equal(countPoints(`wrong`), 0);
      });
    });

    describe(`Incorrect parameters`, () => {
      const countPointsWithIncorrectParameters = (answerType) => {
        countPoints(answerType);
      };

      it(`should throw TypeError`, () => {
        assert.throws(() => {
          countPointsWithIncorrectParameters(true);
        }, TypeError);

        assert.throws(() => {
          countPointsWithIncorrectParameters(initialState);
        }, TypeError);

        assert.throws(() => {
          countPointsWithIncorrectParameters([]);
        }, TypeError);
      });
    });
  });
});
