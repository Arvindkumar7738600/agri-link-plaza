import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  Tractor,
  Users,
  GraduationCap,
  Building2,
  Eye,
  Shield,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface Provider {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  address: string | null;
  district: string | null;
  state: string | null;
  pincode: string | null;
  provider_type: string;
  approval_status: string;
  rejection_reason: string | null;
  created_at: string;
  profile_photo_url: string | null;
  identity_proof_url: string | null;
  identity_proof_type: string | null;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.id) {
      checkAdminStatus();
    }
  }, [user, isAuthenticated, loading, navigate]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setIsAdmin(!!data);
      
      if (data) {
        fetchProviders();
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setIsCheckingAdmin(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProviders(data || []);
      setFilteredProviders(data || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
      toast.error('Failed to load providers');
    }
  };

  useEffect(() => {
    let filtered = providers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone_number.includes(searchTerm) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.approval_status === statusFilter);
    }

    setFilteredProviders(filtered);
  }, [searchTerm, statusFilter, providers]);

  const handleApprove = async (provider: Provider) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('providers')
        .update({ 
          approval_status: 'approved',
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
          rejection_reason: null
        })
        .eq('id', provider.id);

      if (error) throw error;

      toast.success(`${provider.full_name} has been approved!`);
      fetchProviders();
      setIsViewDialogOpen(false);
    } catch (error) {
      console.error('Error approving provider:', error);
      toast.error('Failed to approve provider');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedProvider || !rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('providers')
        .update({ 
          approval_status: 'rejected',
          rejection_reason: rejectionReason.trim()
        })
        .eq('id', selectedProvider.id);

      if (error) throw error;

      toast.success(`${selectedProvider.full_name} has been rejected`);
      fetchProviders();
      setIsRejectDialogOpen(false);
      setIsViewDialogOpen(false);
      setRejectionReason("");
    } catch (error) {
      console.error('Error rejecting provider:', error);
      toast.error('Failed to reject provider');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  const getProviderTypeIcon = (type: string) => {
    switch (type) {
      case 'equipment_owner':
        return <Tractor className="h-4 w-4" />;
      case 'skilled_farmer':
        return <Users className="h-4 w-4" />;
      case 'expert_farmer':
        return <GraduationCap className="h-4 w-4" />;
      case 'fpo_provider':
        return <Building2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getProviderTypeLabel = (type: string) => {
    switch (type) {
      case 'equipment_owner':
        return 'Equipment Owner';
      case 'skilled_farmer':
        return 'Skilled Farmer';
      case 'expert_farmer':
        return 'Expert Farmer';
      case 'fpo_provider':
        return 'FPO Provider';
      default:
        return type;
    }
  };

  const stats = {
    total: providers.length,
    pending: providers.filter(p => p.approval_status === 'pending').length,
    approved: providers.filter(p => p.approval_status === 'approved').length,
    rejected: providers.filter(p => p.approval_status === 'rejected').length,
  };

  if (loading || isCheckingAdmin) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-2xl text-center py-16">
          <div className="bg-destructive/10 p-8 rounded-2xl border border-destructive/20">
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-destructive">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges to access this page.
            </p>
            <Button onClick={() => navigate('/')}>
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground">Review and manage provider applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Providers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No providers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">{provider.full_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getProviderTypeIcon(provider.provider_type)}
                          <span className="text-sm">{getProviderTypeLabel(provider.provider_type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{provider.phone_number}</div>
                          {provider.email && <div className="text-muted-foreground">{provider.email}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {provider.district && provider.state ? (
                          <span className="text-sm">{provider.district}, {provider.state}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(provider.approval_status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(provider.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProvider(provider);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Provider Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Provider Application Details</DialogTitle>
              <DialogDescription>
                Review the application and take action
              </DialogDescription>
            </DialogHeader>
            
            {selectedProvider && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      {getProviderTypeIcon(selectedProvider.provider_type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedProvider.full_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getProviderTypeLabel(selectedProvider.provider_type)}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(selectedProvider.approval_status)}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p>{selectedProvider.phone_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{selectedProvider.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">District</label>
                    <p>{selectedProvider.district || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">State</label>
                    <p>{selectedProvider.state || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Pincode</label>
                    <p>{selectedProvider.pincode || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">ID Proof Type</label>
                    <p>{selectedProvider.identity_proof_type || 'Not provided'}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p>{selectedProvider.address || 'Not provided'}</p>
                  </div>
                </div>

                {selectedProvider.identity_proof_url && (
                  <div className="pt-4 border-t">
                    <label className="text-sm font-medium text-muted-foreground block mb-2">ID Proof Document</label>
                    <a 
                      href={selectedProvider.identity_proof_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Document
                    </a>
                  </div>
                )}

                {selectedProvider.rejection_reason && (
                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                    <label className="text-sm font-medium text-destructive">Previous Rejection Reason</label>
                    <p className="text-sm">{selectedProvider.rejection_reason}</p>
                  </div>
                )}

                <DialogFooter className="flex gap-2 pt-4">
                  {selectedProvider.approval_status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsRejectDialogOpen(true);
                        }}
                        disabled={isProcessing}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleApprove(selectedProvider)}
                        disabled={isProcessing}
                        style={{ background: 'var(--gradient-primary)' }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  )}
                  {selectedProvider.approval_status === 'rejected' && (
                    <Button
                      onClick={() => handleApprove(selectedProvider)}
                      disabled={isProcessing}
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Now
                    </Button>
                  )}
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this application. This will be shared with the provider.
              </DialogDescription>
            </DialogHeader>
            
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleReject}
                disabled={!rejectionReason.trim() || isProcessing}
              >
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;
