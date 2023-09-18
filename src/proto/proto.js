/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
  .addJSON({
    common: {
      nested: {
        MsgID: {
          values: {
            SystemNot: 0,
            SendMsg: 1,
            StartEndLive: 2,
            LiveConnect: 3,
            LivePK: 4,
            ConnectVideo: 5,
            disconnect: 6,
            kyGame: 7,
            LotteryBet: 8,
            LotteryOpenAward: 9,
            moneyChange: 10,
            LotteryDividend: 11,
            LotteryProfit: 12,
            LotterySync: 13,
            SendContactInfo: 14,
            LotteryBarrage: 15,
            LotteryAward: 16,
            SendGift: 17,
            SendBarrage: 18,
            light: 19,
            changeLive: 20,
            updateVotes: 21,
            CloseLive: 22,
            KickUser: 23,
            ShutUpUser: 24,
            stopLive: 25,
            ResumeUser: 26,
            setAdmin: 27,
            BuyGuard: 28,
            SendRed: 29,
            requestFans: 30,
            lotteryInfo: 31,
            openAward: 32,
            platGame: 33
          }
        },
        StreamMsg: {
          fields: {
            msgID: {
              rule: "required",
              type: "common.MsgID",
              id: 1
            },
            msgData: {
              rule: "required",
              type: "bytes",
              id: 2
            }
          }
        }
      }
    },
    s2c: {
      nested: {
        SystemNot: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                uname: {
                  type: "string",
                  id: 3
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                }
              }
            }
          }
        },
        LiveConnect: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                pkuid: {
                  type: "uint32",
                  id: 3
                },
                pkpull: {
                  type: "string",
                  id: 4
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                uname: {
                  type: "string",
                  id: 6
                }
              }
            }
          }
        },
        LivePK: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                pkuid: {
                  type: "uint32",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                uname: {
                  type: "string",
                  id: 5
                }
              }
            }
          }
        },
        requestFans: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            UserInfo: {
              fields: {
                id: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                avatar: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                guardType: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                }
              }
            },
            InfoStruct: {
              fields: {
                list: {
                  rule: "repeated",
                  type: "UserInfo",
                  id: 1
                }
              }
            },
            Fans: {
              fields: {
                code: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                info: {
                  rule: "required",
                  type: "InfoStruct",
                  id: 2
                },
                msg: {
                  type: "string",
                  id: 3
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                ct: {
                  type: "Fans",
                  id: 3
                }
              }
            }
          }
        },
        SendMsg: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                id: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                userNicename: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                avatar: {
                  type: "string",
                  id: 3
                },
                avatarThumb: {
                  type: "string",
                  id: 4
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                usertype: {
                  rule: "required",
                  type: "uint32",
                  id: 6
                },
                vipType: {
                  rule: "required",
                  type: "uint32",
                  id: 7
                },
                guardType: {
                  type: "uint32",
                  id: 8
                },
                liangname: {
                  type: "string",
                  id: 9
                },
                carId: {
                  type: "uint32",
                  id: 10
                },
                carSwf: {
                  type: "string",
                  id: 11
                },
                carSwftime: {
                  type: "string",
                  id: 12
                },
                carWords: {
                  type: "string",
                  id: 13
                },
                isAnchor: {
                  type: "bool",
                  id: 14
                },
                heart: {
                  type: "string",
                  id: 15
                },
                kingIcon: {
                  type: "string",
                  id: 16
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  type: "CTStruct",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                content: {
                  type: "string",
                  id: 4
                },
                uname: {
                  type: "string",
                  id: 5
                }
              }
            }
          }
        },
        StartEndLive: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                uname: {
                  type: "string",
                  id: 3
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                }
              }
            }
          }
        },
        disconnect: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                id: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                userNicename: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                avatar: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "CTStruct",
                  id: 2
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                uname: {
                  type: "string",
                  id: 4
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                }
              }
            }
          }
        },
        kyGame: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                gamePlat: {
                  rule: "required",
                  type: "string",
                  id: 4
                },
                gameKindID: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                }
              }
            }
          }
        },
        platGame: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                gamePlat: {
                  rule: "required",
                  type: "string",
                  id: 4
                },
                gameKindID: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                ext_1: {
                  rule: "required",
                  type: "string",
                  id: 6
                }
              }
            }
          }
        },
        LotteryAward: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                awardMoney: {
                  rule: "required",
                  type: "float",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                }
              }
            }
          }
        },
        LotteryBarrage: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                nickname: {
                  rule: "required",
                  type: "string",
                  id: 1
                },
                lotteryName: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                way: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                totalmoney: {
                  rule: "required",
                  type: "string",
                  id: 4
                },
                showType: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                }
              }
            },
            Barrage: {
              fields: {
                ct: {
                  rule: "required",
                  type: "CTStruct",
                  id: 1
                },
                lt: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                lid: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                st: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                barrageArr: {
                  rule: "repeated",
                  type: "Barrage",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                }
              }
            }
          }
        },
        LotteryBet: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                nickname: {
                  rule: "required",
                  type: "string",
                  id: 1
                },
                lotteryName: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                totalmoney: {
                  rule: "required",
                  type: "string",
                  id: 3
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "CTStruct",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                lotteryType: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                optionName: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                way: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                money: {
                  rule: "required",
                  type: "string",
                  id: 7
                },
                issue: {
                  rule: "required",
                  type: "uint64",
                  id: 8
                },
                optionNameSt: {
                  type: "string",
                  id: 9
                },
                waySt: {
                  type: "string",
                  id: 10
                },
                uid: {
                  type: "uint32",
                  id: 11
                }
              }
            }
          }
        },
        LotteryOpenAward: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            NiuStruct: {
              fields: {
                redNiu: {
                  rule: "required",
                  type: "string",
                  id: 1
                },
                blueNiu: {
                  rule: "required",
                  type: "string",
                  id: 2
                }
              }
            },
            BaiJiaLeStruct: {
              fields: {
                zhuangDian: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                xianDian: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                zhuangDianStr: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                xianDianStr: {
                  rule: "required",
                  type: "string",
                  id: 4
                },
                whoWin: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                zhuangxianStr: {
                  rule: "required",
                  type: "string",
                  id: 6
                }
              }
            },
            ZhaJinHuaStruct: {
              fields: {
                whoWin: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                paiType: {
                  rule: "repeated",
                  type: "uint32",
                  id: 2,
                  options: {
                    packed: false
                  }
                },
                paiTypeStr: {
                  rule: "repeated",
                  type: "string",
                  id: 3
                }
              }
            },
            LongHuStruct: {
              fields: {
                whoWin: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                dragonDian: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                dragonDianStr: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                tigerDian: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                tigerDianStr: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                dragonTigerStr: {
                  rule: "required",
                  type: "string",
                  id: 6
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                lotteryType: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                result: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                name: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                issue: {
                  rule: "required",
                  type: "uint64",
                  id: 7
                },
                sumResultStr: {
                  type: "string",
                  id: 8
                },
                niu: {
                  type: "NiuStruct",
                  id: 9
                },
                winWays: {
                  rule: "repeated",
                  type: "string",
                  id: 10
                },
                bjl: {
                  type: "BaiJiaLeStruct",
                  id: 11
                },
                zjh: {
                  type: "ZhaJinHuaStruct",
                  id: 12
                },
                lh: {
                  type: "LongHuStruct",
                  id: 13
                }
              }
            }
          }
        },
        LotteryDividend: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                nickname: {
                  rule: "required",
                  type: "string",
                  id: 1
                },
                lotteryName: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                totalmoney: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                fromName: {
                  rule: "required",
                  type: "string",
                  id: 4
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "CTStruct",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                fromUid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                fromName: {
                  type: "string",
                  id: 5
                }
              }
            }
          }
        },
        MoneyChange: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                issue: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                money: {
                  rule: "required",
                  type: "float",
                  id: 5
                }
              }
            }
          }
        },
        LotteryProfit: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                nickname: {
                  rule: "required",
                  type: "string",
                  id: 1
                },
                lotteryName: {
                  rule: "required",
                  type: "string",
                  id: 2
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "CTStruct",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                winWay: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                profit: {
                  rule: "required",
                  type: "uint32",
                  id: 6
                }
              }
            }
          }
        },
        LotterySync: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            LotteryInfo: {
              fields: {
                name: {
                  rule: "required",
                  type: "string",
                  id: 1
                },
                logo: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                time: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                sealingTim: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                issue: {
                  rule: "required",
                  type: "uint64",
                  id: 5
                },
                stopOrSell: {
                  type: "uint32",
                  id: 6
                },
                stopMsg: {
                  type: "string",
                  id: 7
                },
                lotteryType: {
                  rule: "required",
                  type: "uint32",
                  id: 8
                },
                serTime: {
                  rule: "required",
                  type: "uint32",
                  id: 9
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                lotteryType: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                lotteryInfo: {
                  rule: "required",
                  type: "LotteryInfo",
                  id: 5
                }
              }
            }
          }
        },
        SendContactInfo: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                }
              }
            }
          }
        },
        SendRed: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                touid: {
                  type: "uint32",
                  id: 4
                },
                ugood: {
                  type: "uint32",
                  id: 5
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 6
                },
                name: {
                  type: "string",
                  id: 7
                },
                uname: {
                  rule: "required",
                  type: "string",
                  id: 8
                },
                equipment: {
                  type: "string",
                  id: 9
                },
                roomnum: {
                  type: "uint32",
                  id: 10
                },
                level: {
                  type: "uint32",
                  id: 11
                },
                evensend: {
                  type: "string",
                  id: 12
                },
                uhead: {
                  type: "string",
                  id: 13
                },
                vipType: {
                  type: "uint32",
                  id: 14
                },
                liangname: {
                  type: "string",
                  id: 15
                },
                isAnchor: {
                  type: "bool",
                  id: 16
                }
              }
            }
          }
        },
        SendGift: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            GiftInfo: {
              fields: {
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                giftid: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                type: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                giftcount: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                totalcoin: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                giftname: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                gifticon: {
                  rule: "required",
                  type: "string",
                  id: 7
                },
                swftime: {
                  rule: "required",
                  type: "uint32",
                  id: 8
                },
                swftype: {
                  rule: "required",
                  type: "uint32",
                  id: 9
                },
                swf: {
                  rule: "required",
                  type: "string",
                  id: 10
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 11
                },
                coin: {
                  rule: "required",
                  type: "uint32",
                  id: 12
                },
                votestotal: {
                  rule: "required",
                  type: "uint32",
                  id: 13
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                ct: {
                  rule: "required",
                  type: "GiftInfo",
                  id: 2
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                uname: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                equipment: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                roomnum: {
                  rule: "required",
                  type: "uint32",
                  id: 7
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 8
                },
                evensend: {
                  rule: "required",
                  type: "string",
                  id: 9
                },
                uhead: {
                  rule: "required",
                  type: "string",
                  id: 10
                },
                vipType: {
                  rule: "required",
                  type: "uint32",
                  id: 11
                },
                liangname: {
                  rule: "required",
                  type: "string",
                  id: 12
                },
                ifpk: {
                  type: "uint32",
                  id: 13
                },
                pkuid1: {
                  type: "uint32",
                  id: 14
                },
                pkuid2: {
                  type: "uint32",
                  id: 15
                },
                pktotal1: {
                  type: "uint32",
                  id: 16
                },
                pktotal2: {
                  type: "uint32",
                  id: 17
                }
              }
            }
          }
        },
        SendBarrage: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            CTStruct: {
              fields: {
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                content: {
                  rule: "required",
                  type: "string",
                  id: 2
                },
                giftid: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                giftcount: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                totalcoin: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                giftname: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                gifticon: {
                  rule: "required",
                  type: "string",
                  id: 7
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 8
                },
                coin: {
                  rule: "required",
                  type: "uint32",
                  id: 9
                },
                votestotal: {
                  rule: "required",
                  type: "uint32",
                  id: 10
                }
              }
            },
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                level: {
                  rule: "required",
                  type: "uint32",
                  id: 3
                },
                uname: {
                  rule: "required",
                  type: "string",
                  id: 4
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                uhead: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                ct: {
                  rule: "required",
                  type: "CTStruct",
                  id: 7
                }
              }
            }
          }
        },
        changeLive: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  type: "uint32",
                  id: 2
                },
                typeVal: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                type: {
                  type: "string",
                  id: 4
                },
                roomType: {
                  type: "string",
                  id: 5
                },
                msg: {
                  type: "string",
                  id: 6
                }
              }
            }
          }
        },
        updateVotes: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                votes: {
                  rule: "required",
                  type: "float",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                isfirst: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                }
              }
            }
          }
        },
        ShutUpUser: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                touid: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                }
              }
            }
          }
        },
        setAdmin: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                uname: {
                  rule: "required",
                  type: "string",
                  id: 5
                },
                touid: {
                  rule: "required",
                  type: "uint32",
                  id: 6
                },
                touname: {
                  rule: "required",
                  type: "string",
                  id: 7
                }
              }
            }
          }
        },
        BuyGuard: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                ct: {
                  type: "string",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                uname: {
                  type: "string",
                  id: 5
                },
                uhead: {
                  rule: "required",
                  type: "string",
                  id: 6
                },
                votestotal: {
                  rule: "required",
                  type: "uint32",
                  id: 7
                },
                guardNums: {
                  rule: "required",
                  type: "uint32",
                  id: 8
                },
                guardType: {
                  type: "uint32",
                  id: 9
                }
              }
            }
          }
        },
        KickUser: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                ct: {
                  rule: "required",
                  type: "string",
                  id: 3
                },
                uid: {
                  rule: "required",
                  type: "uint32",
                  id: 4
                },
                touid: {
                  rule: "required",
                  type: "uint32",
                  id: 5
                },
                showid: {
                  type: "uint32",
                  id: 6
                },
                uname: {
                  type: "string",
                  id: 7
                }
              }
            }
          }
        },
        light: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                },
                ct: {
                  type: "string",
                  id: 3
                }
              }
            }
          }
        },
        stopLive: {
          fields: {
            retcode: {
              rule: "required",
              type: "uint32",
              id: 1
            },
            retmsg: {
              type: "string",
              id: 2
            },
            msg: {
              rule: "required",
              type: "Msg",
              id: 3
            }
          },
          nested: {
            Msg: {
              fields: {
                action: {
                  rule: "required",
                  type: "uint32",
                  id: 1
                },
                msgtype: {
                  rule: "required",
                  type: "uint32",
                  id: 2
                }
              }
            }
          }
        }
      }
    }
  });

module.exports = $root;
