'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Coins, Plus, RefreshCw, ArrowDown, History } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface TokenUser {
  id: string;
  name: string;
  email: string;
  tokenBalance: number;
  membershipType: 'Basic' | 'Premium' | 'Elite';
  status: 'Active' | 'Inactive';
  lastTransaction: string | null;
  joinDate: string;
}

// AssignTokens Component
const AssignTokens = ({ 
  users, 
  onAddTokens, 
  onDeductTokens 
}: { 
  users: TokenUser[],
  onAddTokens: (userId: string, amount: number) => void,
  onDeductTokens: (userId: string, amount: number) => void
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [tokenAmount, setTokenAmount] = useState<string>('');

  const handleAddTokens = () => {
    if (!selectedUserId || !tokenAmount || isNaN(Number(tokenAmount)) || Number(tokenAmount) <= 0) {
      toast.error("Please select a user and enter a valid token amount.");
      return;
    }
    onAddTokens(selectedUserId, Number(tokenAmount));
    setTokenAmount('');
  };

  const handleDeductTokens = () => {
    if (!selectedUserId || !tokenAmount || isNaN(Number(tokenAmount)) || Number(tokenAmount) <= 0) {
      toast.error("Please select a user and enter a valid token amount.");
      return;
    }
    onDeductTokens(selectedUserId, Number(tokenAmount));
    setTokenAmount('');
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-100">Assign Tokens</CardTitle>
        <CardDescription className="text-gray-400">Add or remove tokens from user accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="user" className="text-gray-300">Select User</Label>
            <Select onValueChange={setSelectedUserId}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amount" className="text-gray-300">Token Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="Enter token amount" 
              value={tokenAmount} 
              onChange={(e) => setTokenAmount(e.target.value)} 
              className="bg-gray-800 border-gray-700 text-gray-200" 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button 
          onClick={handleAddTokens} 
          className="bg-green-700 hover:bg-green-600 text-gray-100"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Tokens
        </Button>
        <Button 
          onClick={handleDeductTokens} 
          className="bg-amber-700 hover:bg-amber-600 text-gray-100"
        >
          <ArrowDown className="mr-2 h-4 w-4" /> Deduct Tokens
        </Button>
      </CardFooter>
    </Card>
  );
};

// UserTokenBalances Component
const UserTokenBalances = ({ 
  users, 
  onResetTokens, 
  onToggleStatus, 
  onUpdateMembership 
}: { 
  users: TokenUser[],
  onResetTokens: (userId: string) => void,
  onToggleStatus: (userId: string) => void,
  onUpdateMembership: (userId: string, type: 'Basic' | 'Premium' | 'Elite') => void
}) => {
  const [filterActive, setFilterActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('balance-desc');

  const filteredUsers = users
    .filter(user => filterActive ? user.status === 'Active' : true)
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'balance-desc': return b.tokenBalance - a.tokenBalance;
        case 'balance-asc': return a.tokenBalance - b.tokenBalance;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMembershipColor = (type: 'Basic' | 'Premium' | 'Elite') => {
    switch (type) {
      case 'Basic': return 'bg-blue-900 text-blue-100';
      case 'Premium': return 'bg-purple-900 text-purple-100';
      case 'Elite': return 'bg-amber-900 text-amber-100';
      default: return 'bg-gray-700 text-gray-100';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-gray-100">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-gray-100">User Token Balances</CardTitle>
            <CardDescription className="text-gray-400">Manage user tokens and membership status</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Show inactive users</span>
            <Switch 
              checked={!filterActive} 
              onCheckedChange={(checked) => setFilterActive(!checked)} 
              className="data-[state=checked]:bg-purple-700" 
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              placeholder="Search users..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-gray-800 border-gray-700 text-gray-200" 
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200 w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="balance-desc">Highest Balance</SelectItem>
                <SelectItem value="balance-asc">Lowest Balance</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <p className="text-gray-400">No users match your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border border-gray-800 rounded-lg p-4 bg-gray-850 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-100">{user.name}</h3>
                      <div className="text-sm text-gray-400">{user.email}</div>
                      <div className="text-sm text-gray-400">
                        Joined: {formatDate(user.joinDate)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge 
                        variant={user.status === 'Active' ? "default" : "secondary"} 
                        className={user.status === 'Active' ? "bg-green-700" : "bg-gray-700"}
                      >
                        {user.status}
                      </Badge>
                      <Badge className={getMembershipColor(user.membershipType)}>
                        {user.membershipType}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-gray-800 p-3 rounded flex-1 font-mono text-xl text-green-400 flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-amber-400" /> {user.tokenBalance} tokens
                    </div>
                  </div>

                  {user.lastTransaction && (
                    <div className="text-xs text-gray-400 flex items-center mb-3">
                      <History className="h-3 w-3 mr-1" /> Last transaction: {formatDate(user.lastTransaction)}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Select 
                      defaultValue={user.membershipType} 
                      onValueChange={(value) => onUpdateMembership(user.id, value as 'Basic' | 'Premium' | 'Elite')}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200 w-32">
                        <SelectValue placeholder="Membership" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Elite">Elite</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onToggleStatus(user.id)}
                      className={user.status === 'Active' 
                        ? "text-red-400 border-red-700 hover:bg-red-900 hover:text-red-100" 
                        : "text-green-400 border-green-700 hover:bg-green-900 hover:text-green-100"
                      }
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onResetTokens(user.id)}
                      className="text-amber-400 border-amber-700 hover:bg-amber-900 hover:text-amber-100"
                    >
                      <RefreshCw className="mr-2 h-3 w-3" /> Reset Tokens
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main component
export default function TokenMoneyManagement() {
  const [users, setUsers] = useState<TokenUser[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      tokenBalance: 500,
      membershipType: 'Premium',
      status: 'Active',
      lastTransaction: '2025-04-02T14:22:15Z',
      joinDate: '2024-11-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      tokenBalance: 250,
      membershipType: 'Basic',
      status: 'Active',
      lastTransaction: '2025-03-27T09:11:30Z',
      joinDate: '2024-12-05T08:45:00Z'
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james.w@example.com',
      tokenBalance: 1000,
      membershipType: 'Elite',
      status: 'Inactive',
      lastTransaction: null,
      joinDate: '2025-01-22T15:20:00Z'
    }
  ]);

  const addTokens = (userId: string, amount: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          tokenBalance: user.tokenBalance + amount,
          lastTransaction: new Date().toISOString(),
          status: 'Active'
        };
      }
      return user;
    }));
    toast.success(`${amount} tokens added successfully.`);
  };

  const deductTokens = (userId: string, amount: number) => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser && selectedUser.tokenBalance < amount) {
      toast.error("User doesn't have enough tokens for this deduction.");
      return;
    }
    
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          tokenBalance: user.tokenBalance - amount,
          lastTransaction: new Date().toISOString()
        };
      }
      return user;
    }));
    toast.success(`${amount} tokens deducted successfully.`);
  };

  const resetTokens = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          tokenBalance: 0,
          lastTransaction: new Date().toISOString()
        };
      }
      return user;
    }));
    toast.success("User tokens reset to zero.");
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return user;
    }));
    const user = users.find(u => u.id === userId);
    toast.success(`User status changed to ${user?.status === 'Active' ? 'Inactive' : 'Active'}`);
  };

  const updateMembershipType = (userId: string, type: 'Basic' | 'Premium' | 'Elite') => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          membershipType: type
        };
      }
      return user;
    }));
    toast.success(`Membership updated to ${type}.`);
  };

  return (
    <div className="space-y-6 bg-gray-900 text-gray-100 p-6 min-h-screen">
      <AssignTokens 
        users={users} 
        onAddTokens={addTokens} 
        onDeductTokens={deductTokens} 
      />
      
      <UserTokenBalances 
        users={users} 
        onResetTokens={resetTokens} 
        onToggleStatus={toggleUserStatus} 
        onUpdateMembership={updateMembershipType} 
      />
    </div>
  );
}