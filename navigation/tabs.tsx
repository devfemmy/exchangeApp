/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import React from "react";
import {
    TouchableOpacity,
} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {TabIcon} from "../components"
import { Home, Assets, Profile, Transaction } from "../screens";

import { COLORS} from "../utils/constants/theme"
import icons from "../utils/constants/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTradeStatus, modeStatus, tradeStatus } from "../slice/TradeSlice";
import ArrowIcon from '../assets/svg/arrow1.svg';
import { hp } from "../utils/helper";


const Tab = createBottomTabNavigator()


const TabBarCustomButton = ({children,isActiveIcon, onPress}: any) => {

  return (
    <TouchableOpacity
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.primary,
            width: hp(60),
            height: hp(60),
            borderRadius: hp(30),
            marginTop: hp(10)
        }}
        onPress={onPress}
    >
        {
            isActiveIcon ? children : <ArrowIcon width={24} height={24} />
        }
{/* {children} */}
{/* <ArrowIcon width={24} height={24} /> */}
    </TouchableOpacity>
  )
}

const Tabs = () => {
  const dispatch = useAppDispatch()

  const tradeStatusInfo = useAppSelector(tradeStatus)
  const modeInfo = useAppSelector(modeStatus);

  const tradeTabButtonHandler = () => {
    dispatch(getTradeStatus(!tradeStatusInfo))
  }

    return (
        <Tab.Navigator
          screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                  height: 120,
                  borderTopColor: COLORS.primary,
                  borderTopWidth: 2,
                  backgroundColor: modeInfo ? "white" : COLORS.darkMode
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                tabBarIcon: ({focused}) => {
                    // if(!tradeStatusInfo) {
                      return (
                        <TabIcon 
                            focused={focused}
                            icon={icons.home}
                            label="Home"
                            modeInfo={modeInfo}
                        />
                    )  
                    // }
                }
                
            }} 
            listeners={{
                    tabPress: e => {
                        if(tradeStatusInfo){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen 
                name="Assets" 
                component={Assets} 
                options={{
                    tabBarIcon: ({focused}) => {
                        // if(!tradeStatusInfo){
                            return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.briefcase}
                                label="Assets"
                                modeInfo={modeInfo}
                            />
                        )
                        // }
                        
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(tradeStatusInfo){
                            e.preventDefault()
                        }
                    }
                }}
                />
            <Tab.Screen 
                name="Trade" 
                component={Home} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabIcon 
                                focused={focused}
                                icon={tradeStatusInfo ? icons.close : icons.trade}
                                isTrade={true}
                                label="Trade"
                                modeInfo={modeInfo}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                            isActiveIcon={tradeStatusInfo ? true : false}
                            onPress={() => tradeTabButtonHandler()}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Transaction" 
                component={Transaction} 
                options={{
                    tabBarIcon: ({focused}) => {
                        // if(!tradeStatusInfo){
                            return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.market}
                                label="Transaction"
                                modeInfo={modeInfo}
                            />
                        )
                        // }
                        
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(tradeStatusInfo){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon: ({focused}) => {
                        // if(!tradeStatusInfo){
                            return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.profile}
                                label="Profile"
                                modeInfo={modeInfo}
                            />
                        ) 
                        // }
                       
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(tradeStatusInfo){
                            e.preventDefault()
                        }
                    }
                }}
            />

        </Tab.Navigator>
    )
}


export default Tabs