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
import { getTradeStatus, tradeStatus } from "../slice/TradeSlice";


const Tab = createBottomTabNavigator()


const TabBarCustomButton = ({children, onPress}: any) => {
  return (
    <TouchableOpacity
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onPress={onPress}
    >
{children}
    </TouchableOpacity>
  )
}

const Tabs = () => {
  const dispatch = useAppDispatch()

  const tradeStatusInfo = useAppSelector(tradeStatus)


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
                  borderTopColor: "transparent"
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                tabBarIcon: ({focused}) => {
                    if(!tradeStatusInfo) {
                      return (
                        <TabIcon 
                            focused={focused}
                            icon={icons.home}
                            label="Home"
                        />
                    )  
                    }
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
                        if(!tradeStatusInfo){
                            return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.briefcase}
                                label="Assets"
                            />
                        )
                        }
                        
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
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
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
                        if(!tradeStatusInfo){
                            return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.market}
                                label="Transaction"
                            />
                        )
                        }
                        
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
                        if(!tradeStatusInfo){
                            return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.profile}
                                label="Profile"
                            />
                        ) 
                        }
                       
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