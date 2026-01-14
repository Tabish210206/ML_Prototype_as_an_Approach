import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, FileText, Settings, Shield, Check } from 'lucide-react';
import { toast } from 'sonner';

const AdminControlsTab = () => {
  const [forecastHorizon, setForecastHorizon] = useState('12');
  const [threshold, setThreshold] = useState([20]);
  const [deskCapacity, setDeskCapacity] = useState([2000]);
  const [costPerDesk, setCostPerDesk] = useState([50000]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; rows: number; status: string }>>([]);

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    const mockFile = {
      name: type === 'enrolments' ? 'historical_enrolments.csv' : 'birth_data.csv',
      rows: type === 'enrolments' ? 1248 : 28,
      status: 'validated',
    };
    setUploadedFiles(prev => [...prev, mockFile]);
    toast.success(`${mockFile.name} uploaded successfully`);
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Data Upload */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              <CardTitle>Data Upload</CardTitle>
            </div>
            <CardDescription>
              Upload CSV files for historical enrolments and birth data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => handleFileUpload('enrolments')}>
                <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Historical Enrolments</p>
                <p className="text-xs text-muted-foreground">Format: date, region, enrolments</p>
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => handleFileUpload('births')}>
                <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Birth Data</p>
                <p className="text-xs text-muted-foreground">Format: region, births, hospitals, inst_birth%</p>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Uploaded Files</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File</TableHead>
                      <TableHead>Rows</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedFiles.map((file, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell>{file.rows}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-accent/10 text-accent">
                            <Check className="h-3 w-3 mr-1" />
                            {file.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Configuration</CardTitle>
            </div>
            <CardDescription>
              Adjust model parameters and thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Forecast Horizon</Label>
              <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>High-Demand Threshold</Label>
                <span className="text-sm font-medium">Top {threshold[0]}%</span>
              </div>
              <Slider
                value={threshold}
                onValueChange={setThreshold}
                min={10}
                max={40}
                step={5}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Desk Capacity (births/desk)</Label>
                <span className="text-sm font-medium">{deskCapacity[0].toLocaleString()}</span>
              </div>
              <Slider
                value={deskCapacity}
                onValueChange={setDeskCapacity}
                min={1000}
                max={5000}
                step={500}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Cost per Desk (Rs)</Label>
                <span className="text-sm font-medium">Rs {costPerDesk[0].toLocaleString()}</span>
              </div>
              <Slider
                value={costPerDesk}
                onValueChange={setCostPerDesk}
                min={30000}
                max={100000}
                step={5000}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <CardTitle>Export</CardTitle>
            </div>
            <CardDescription>
              Download charts, tables, and API documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleExport('png')}
              >
                <FileText className="h-5 w-5" />
                <span>PNG</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleExport('pdf')}
              >
                <FileText className="h-5 w-5" />
                <span>PDF</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleExport('csv')}
              >
                <FileText className="h-5 w-5" />
                <span>CSV</span>
              </Button>
            </div>
            
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">API Documentation</p>
              <code className="text-xs text-muted-foreground block">
                GET /api/v1/forecast?region=all&horizon=12
              </code>
              <code className="text-xs text-muted-foreground block mt-1">
                GET /api/v1/birth-desks?state=all
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Security & Compliance</CardTitle>
            </div>
            <CardDescription>
              Data protection and privacy measures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                <Check className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">No Biometrics Stored</p>
                  <p className="text-xs text-muted-foreground">
                    This prototype uses only aggregate demographic data
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                <Check className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Token-Based Authentication</p>
                  <p className="text-xs text-muted-foreground">
                    All API endpoints require valid JWT tokens
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                <Check className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ephemeral Pre-Aadhaar IDs</p>
                  <p className="text-xs text-muted-foreground">
                    Temporary IDs expire after full Aadhaar generation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                <Check className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">UIDAI Compliance Ready</p>
                  <p className="text-xs text-muted-foreground">
                    Follows all UIDAI data handling guidelines
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminControlsTab;
