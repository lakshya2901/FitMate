// File: components/TokenManagement.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Coins, RefreshCw } from 'lucide-react';

// User Token Balances Component
export default function TokenManagement() {
  const [filterActive, setFilterActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('highest');

  // Sample data (only Premium and Basic users)
  const users = [
    { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', tokenBalance: 500, membershipType: 'Premium', status: 'Active' },
    { id: '2', name: 'Meera Iyer', email: 'meera.iyer@gmail.com', tokenBalance: 250, membershipType: 'Basic', status: 'Active' },
    { id: '4', name: 'Rohan Gupta', email: 'rohan.gupta@gmail.com', tokenBalance: 150, membershipType: 'Premium', status: 'Inactive' },
    { id: '5', name: 'Priya Verma', email: 'priya.verma@gmail.com', tokenBalance: 8500, membershipType: 'Basic', status: 'Active' },
    { id: '6', name: 'Ananya Singh', email: 'ananya.singh@gmail.com', tokenBalance: 20000, membershipType: 'Premium', status: 'Active' },
    { id: '7', name: 'Kunal Nair', email: 'kunal.nair@gmail.com', tokenBalance: 1200, membershipType: 'Basic', status: 'Inactive' },
    { id: '8', name: 'Ishita Das', email: 'ishita.das@gmail.com', tokenBalance: 300, membershipType: 'Premium', status: 'Active' },
    { id: '9', name: 'Raj Mehta', email: 'raj.mehta@gmail.com', tokenBalance: 675, membershipType: 'Basic', status: 'Active' }
  ];

  const filteredUsers = users
    .filter(user => filterActive ? user.status === 'Active' : true)
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'highest' ? b.tokenBalance - a.tokenBalance : a.tokenBalance - b.tokenBalance);

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Basic': return 'bg-blue-800';
      case 'Premium': return 'bg-purple-800';
      default: return 'bg-gray-700';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">User Token Balances</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Show inactive</span>
            <Switch 
              checked={!filterActive} 
              onCheckedChange={(checked) => setFilterActive(!checked)} 
              className="h-4 w-8 data-[state=checked]:bg-blue-600" 
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="flex space-x-2">
          <Input 
            placeholder="Search users..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="h-8 text-sm bg-gray-800 border-gray-700" 
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-8 text-sm bg-gray-800 border-gray-700 w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="highest">Highest Balance</SelectItem>
              <SelectItem value="lowest">Lowest Balance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thumb-rounded scrollbar-track-rounded">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded-md p-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getMembershipColor(user.membershipType)}>
                    {user.membershipType}
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-green-400">
                  <Coins className="h-3 w-3 mr-1" />
                  <span className="text-sm">{user.tokenBalance}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-400 hover:text-blue-300">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
