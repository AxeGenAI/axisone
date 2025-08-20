import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  X,
  Plus,
  Beaker,
  Users,
  Target,
  Zap
} from 'lucide-react';

interface RequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    researchType: '',
    priority: 'medium',
    budget: '',
    timeline: '',
    deliverables: [''],
    requirements: '',
    files: [] as File[],
    preferredLabs: [] as string[],
    contactMethod: 'email'
  });

  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI-powered deliverables mapping based on research type
  const getDeliverableOptions = (researchType: string) => {
    const deliverableMap: Record<string, string[]> = {
      'genomics': [
        'Raw FASTQ sequencing files',
        'Quality control reports (FastQC)',
        'Aligned BAM/SAM files',
        'Variant calling results (VCF)',
        'Annotated variant reports',
        'Coverage analysis reports',
        'Phylogenetic analysis',
        'Gene expression matrices',
        'Differential expression analysis',
        'Pathway enrichment analysis',
        'Interactive genome browser tracks',
        'Executive summary report'
      ],
      'proteomics': [
        'Raw mass spectrometry data files',
        'Protein identification reports',
        'Quantitative protein expression data',
        'Post-translational modification analysis',
        'Protein-protein interaction networks',
        'Functional annotation reports',
        'Statistical analysis results',
        'Pathway analysis reports',
        'Quality control metrics',
        'Processed data matrices',
        'Publication-ready figures',
        'Comprehensive analysis report'
      ],
      'cell-culture': [
        'Cell viability assay results',
        'Growth curve analysis',
        'Morphological assessment images',
        'Contamination screening reports',
        'Cell line authentication certificates',
        'Passage history documentation',
        'Cryopreservation protocols',
        'Culture condition optimization',
        'Transfection efficiency reports',
        'Drug response curves',
        'Time-lapse imaging data',
        'Standard operating procedures'
      ],
      'microscopy': [
        'High-resolution image files (TIFF/CZI)',
        'Image acquisition metadata',
        'Quantitative analysis results',
        'Colocalization analysis',
        'Morphometric measurements',
        'Time-lapse movie files',
        'Z-stack reconstructions',
        'Fluorescence intensity profiles',
        'Statistical analysis reports',
        'Image processing protocols',
        'Publication-ready figures',
        'Imaging methodology report'
      ],
      'mass-spec': [
        'Raw instrument data files',
        'Processed spectral data',
        'Compound identification reports',
        'Quantitative analysis results',
        'Method validation documentation',
        'Calibration curve data',
        'Quality control reports',
        'Structural elucidation reports',
        'Purity assessment results',
        'Comparative analysis reports',
        'Instrument method files',
        'Analytical summary report'
      ],
      'biochemical': [
        'Enzyme activity assay results',
        'Kinetic parameter calculations',
        'Inhibition studies data',
        'Substrate specificity analysis',
        'pH and temperature optimization',
        'Protein purification protocols',
        'SDS-PAGE gel images',
        'Western blot results',
        'Binding affinity measurements',
        'Thermostability analysis',
        'Quality control certificates',
        'Biochemical characterization report'
      ],
      'histology': [
        'Digital slide images (whole slide scans)',
        'Histopathological assessment reports',
        'Immunohistochemistry results',
        'Morphometric analysis data',
        'Tissue scoring and grading',
        'Special staining results',
        'Quantitative image analysis',
        'Pathologist review reports',
        'Comparative analysis studies',
        'Quality control documentation',
        'Diagnostic interpretation',
        'Clinical correlation summary'
      ],
      'other': [
        'Raw experimental data files',
        'Processed analysis results',
        'Quality control reports',
        'Method development protocols',
        'Statistical analysis results',
        'Comparative studies data',
        'Validation documentation',
        'Technical methodology report',
        'Executive summary',
        'Recommendations report',
        'Follow-up study suggestions',
        'Custom deliverable specifications'
      ]
    };
    
    return deliverableMap[researchType] || deliverableMap['other'];
  };

  const researchTypes = [
    { id: 'genomics', label: 'Genomic Sequencing', icon: '🧬', description: 'DNA/RNA analysis and sequencing' },
    { id: 'proteomics', label: 'Protein Analysis', icon: '🔬', description: 'Protein structure and function studies' },
    { id: 'cell-culture', label: 'Cell Culture', icon: '🦠', description: 'Cell line development and analysis' },
    { id: 'microscopy', label: 'Microscopy', icon: '🔍', description: 'Advanced imaging and visualization' },
    { id: 'mass-spec', label: 'Mass Spectrometry', icon: '⚗️', description: 'Molecular identification and quantification' },
    { id: 'biochemical', label: 'Biochemical Assays', icon: '🧪', description: 'Enzyme and metabolic studies' },
    { id: 'histology', label: 'Histopathology', icon: '📊', description: 'Tissue analysis and pathology' },
    { id: 'other', label: 'Other', icon: '💡', description: 'Custom research requirements' }
  ];

  const priorityLevels = [
    { id: 'low', label: 'Standard', color: 'gray', description: '2-4 weeks timeline' },
    { id: 'medium', label: 'Priority', color: 'blue', description: '1-2 weeks timeline' },
    { id: 'high', label: 'Urgent', color: 'red', description: '3-7 days timeline' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const addDeliverable = () => {
    const availableOptions = getDeliverableOptions(formData.researchType);
    const unusedOptions = availableOptions.filter(option => 
      !formData.deliverables.includes(option)
    );
    
    if (unusedOptions.length > 0) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, '']
      }));
    }
  };

  const updateDeliverable = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.map((item, i) => i === index ? value : item)
    }));
  };

  const removeDeliverable = (index: number) => {
    if (formData.deliverables.length > 1) {
      setFormData(prev => ({
        ...prev,
        deliverables: prev.deliverables.filter((_, i) => i !== index)
      }));
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    const stepErrors = validateCurrentStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 2000);
  };

  const validateCurrentStep = () => {
    const stepErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.title.trim()) {
        stepErrors.title = 'Project title is required';
      }
      if (!formData.researchType) {
        stepErrors.researchType = 'Please select a research type';
      }
      if (!formData.description.trim()) {
        stepErrors.description = 'Project description is required';
      }
    }
    
    if (currentStep === 2) {
      const validDeliverables = formData.deliverables.filter(d => d.trim());
      if (validDeliverables.length === 0) {
        stepErrors.deliverables = 'At least one deliverable is required';
      }
    }
    
    return stepErrors;
  };

  const getStepProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  const isStepValid = (step: number) => {
    if (step === 1) {
      return formData.title && formData.researchType && formData.description;
    }
    if (step === 2) {
      return formData.deliverables.filter(d => d.trim()).length > 0;
    }
    return true;
  };

  const renderStepIndicator = () => (
    <div className="mb-12">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${getStepProgress()}%` }}
        ></div>
      </div>
      
      {/* Step Indicators */}
      <div className="flex items-center justify-center">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 ${
              step === currentStep
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] scale-110'
                : step < currentStep
                ? 'bg-green-500 text-white shadow-lg cursor-pointer hover:scale-105'
                : isStepValid(step)
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-pointer hover:scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
            }`}>
              {step < currentStep ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : step === currentStep ? (
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              ) : (
                step
              )}
            </div>
            {step < totalSteps && (
              <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
                step < currentStep 
                  ? 'bg-green-500' 
                  : step === currentStep 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Research Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Tell us about your research project</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Project Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter a descriptive title for your research project"
            className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium ${
              errors.title ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
            }`}
            required
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Research Type *
          </label>
          {errors.researchType && (
            <p className="mb-3 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.researchType}</span>
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {researchTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, researchType: type.id }))}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 group ${
                  formData.researchType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-[0_8px_24px_-4px_rgba(59,130,246,0.3)]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{type.icon}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{type.label}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Project Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Provide detailed information about your research objectives, methodology, and expected outcomes..."
            rows={6}
            className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium resize-none ${
              errors.description ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
            }`}
            required
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project Requirements</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Define your timeline, budget, and deliverables</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Priority Level *
          </label>
          <div className="space-y-3">
            {priorityLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priority: level.id }))}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  formData.priority === level.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{level.label}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{level.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${
                    formData.priority === level.id ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Budget Range
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <select
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full pl-12 pr-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium appearance-none cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k-500k">$250,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1,000,000</option>
                <option value="over-1m">Over $1,000,000</option>
                <option value="custom">Custom Range</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Expected Timeline
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <select
                value={formData.timeline}
                onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                className="w-full pl-12 pr-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium appearance-none cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
              >
                <option value="">Select expected timeline</option>
                <option value="rush-1-3-days">Rush (1-3 days)</option>
                <option value="urgent-1-week">Urgent (1 week)</option>
                <option value="priority-2-weeks">Priority (2 weeks)</option>
                <option value="standard-1-month">Standard (1 month)</option>
                <option value="extended-2-3-months">Extended (2-3 months)</option>
                <option value="long-term-3-6-months">Long-term (3-6 months)</option>
                <option value="research-6-12-months">Research Project (6-12 months)</option>
                <option value="ongoing-12-months">Ongoing (12+ months)</option>
                <option value="flexible">Flexible Timeline</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Expected Deliverables *
        </label>
        {errors.deliverables && (
          <p className="mb-3 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.deliverables}</span>
          </p>
        )}
        <div className="space-y-4">
          {formData.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-1">
                <select
                  value={deliverable}
                  onChange={(e) => updateDeliverable(index, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium appearance-none cursor-pointer"
                >
                  <option value="">Select a deliverable</option>
                  {getDeliverableOptions(formData.researchType).map((option) => (
                    <option key={option} value={option} disabled={formData.deliverables.includes(option) && deliverable !== option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {formData.deliverables.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDeliverable(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addDeliverable}
            className="flex items-center space-x-2 px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Deliverable</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Supporting Documents</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Upload any relevant files or protocols</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
        />
        
        <div className="space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl flex items-center justify-center mx-auto">
            <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Support for PDF, Word, Excel, PowerPoint, and image files
            </p>
          </div>
        </div>
      </div>

      {formData.files.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">Uploaded Files:</h4>
          <div className="space-y-3">
            {formData.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Special Requirements or Notes
        </label>
        <textarea
          value={formData.requirements}
          onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
          placeholder="Any specific protocols, equipment requirements, or special handling instructions..."
          rows={4}
          className="w-full px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium resize-none"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Confirm your request details before submission</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Project Overview</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Title:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.title || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {researchTypes.find(t => t.id === formData.researchType)?.label || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {priorityLevels.find(p => p.id === formData.priority)?.label || 'Medium'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Requirements</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.budget || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Timeline:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.timeline || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Files:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.files.length} uploaded</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Description:</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {formData.description || 'No description provided'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Deliverables:</h3>
          <ul className="space-y-2">
            {formData.deliverables.filter(d => d.trim()).map((deliverable, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Your request will be reviewed within 2 hours</li>
              <li>• Matching laboratories will be notified automatically</li>
              <li>• You'll receive initial responses within 24 hours</li>
              <li>• Direct communication channels will be established</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">
        {renderStepIndicator()}
        
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3),0_8px_25px_-8px_rgba(0,0,0,0.2)]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={currentStep === 1 ? onCancel : prevStep}
            className="px-8 py-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(59,130,246,0.5)] hover:scale-105 flex items-center space-x-2"
              >
                <span>Continue</span>
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(34,197,94,0.5)] hover:scale-105 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;