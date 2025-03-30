// import { Tabs } from 'expo-router';
// import { Home as Home, Search, ShoppingBag, Heart, User } from 'lucide-react-native';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#ffffff',
//           borderTopWidth: 1,
//           borderTopColor: '#f1f1f1',
//         },
//         tabBarActiveTintColor: '#000000',
//         tabBarInactiveTintColor: '#666666',
//         tabBarLabelStyle: {
//           fontFamily: 'Inter_500Medium',
//           fontSize: 12,
//         },
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="search"
//         options={{
//           title: 'Search',
//           tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="favorites"
//         options={{
//           title: 'Favorites',
//           tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }