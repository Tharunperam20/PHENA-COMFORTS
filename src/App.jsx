import React, { useState, useEffect, useRef } from 'react';

const INITIAL_MATERIALS = [
  {
    id: 'pu-foam',
    name: 'PU Foam (High Resilience)',
    tag: 'Uniform Spine Support',
    description: 'Precision-sliced high-resilience Polyurethane foam for uniform pressure distribution and daily durability.'
  },
  {
    id: 'pocket-spring',
    name: 'Pocketed Spring Core',
    tag: 'Zero Motion Transfer',
    description: 'Individually wrapped steel coils that contour independently to your body without disturbing your partner.'
  },
  {
    id: 'natural-latex',
    name: 'Natural Breathable Latex',
    tag: 'Plush & Cooling',
    description: 'Pinhole-ventilated natural latex layer for responsive bounce, cool airflow, and hypoallergenic comfort.'
  },
  {
    id: 'rebonded-foam',
    name: 'Rebonded Orthopedic Foam',
    tag: 'Firm Back Support',
    description: 'High-density compressed orthopedic base core engineered specifically for strict spinal alignment and back pain care.'
  },
  {
    id: 'bonnell-spring',
    name: 'Bonnell Spring System',
    tag: 'Classic Bounce & Support',
    description: 'Traditional hour-glass tempered steel spring matrix with heavy-duty perimeter edge-guard reinforcement.'
  },
  {
    id: 'memory-foam',
    name: 'Contoured Memory Foam',
    tag: 'Pressure Relief',
    description: 'Visco-elastic slow-recovery top layer that cradles shoulders, hips, and joints.'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-pu-mattress',
    name: 'PU Foam Mattress',
    category: 'Beds & Mattresses',
    badge: 'Custom Size & Density',
    description: 'Multi-color high-resilience PU foam mattresses cut to your exact cot length, width, and thickness.',
    defaultMaterials: ['PU Foam (High Resilience)'],
    specs: ['4" to 10" Custom Thickness', 'Quilted Jacquard / Cotton Cover', 'Single, Double, Queen, King & Odd Sizes']
  },
  {
    id: 'prod-pocket-spring',
    name: 'Pocketed Spring Mattress',
    category: 'Beds & Mattresses',
    badge: 'Zero Partner Disturbance',
    description: 'Individually encased pocket spring mattresses combined with plush PU foam or latex comfort top layers.',
    defaultMaterials: ['Pocketed Spring Core', 'PU Foam (High Resilience)'],
    specs: ['6" to 12" Custom Thickness', 'High-Tensile Pocket Coils', 'Reinforced Foam Edge Wall']
  },
  {
    id: 'prod-pillows',
    name: 'Pillows & Cervical Bolsters',
    category: 'Pillows',
    badge: 'Neck & Spine Alignment',
    description: 'Orthopedic contoured neck pillows, standard plush PU foam pillows, and round cylindrical bolsters.',
    defaultMaterials: ['PU Foam (High Resilience)', 'Contoured Memory Foam'],
    specs: ['Contour & Standard Shapes', 'Hypoallergenic Inner Core', 'Custom Length & Loft']
  },
  {
    id: 'prod-sofa-cushions',
    name: 'Sofa Cushions (L-Shape & Custom)',
    category: 'Sofa Cushions',
    badge: 'Sag-Resistant Seating',
    description: 'Custom-moulded L-shaped sofa blocks, wooden couch replacement seats, and high-density backrest cushions.',
    defaultMaterials: ['PU Foam (High Resilience)', 'Rebonded Orthopedic Foam'],
    specs: ['Exact L-Cut & Bevel Cutting', 'High Density Anti-Sag Core', 'Custom Thickness 3" to 8"']
  },
  {
    id: 'prod-resting-wedges',
    name: 'Resting Wedges (Medical Incline)',
    category: 'Resting Wedges',
    badge: 'Acid Reflux & Back Care',
    description: 'Ergonomically angled foam resting wedges for upper-body elevation, reading comfort, GERD, and leg support.',
    defaultMaterials: ['PU Foam (High Resilience)', 'Rebonded Orthopedic Foam'],
    specs: ['Calibrated Slope Angle', 'Washable Zippered Cover', 'Dual-Layer Option Available']
  },
  {
    id: 'prod-hospital-beds',
    name: 'Hospital Beds & Medical Mattresses',
    category: 'Hospital Beds',
    badge: 'Waterproof & Sectional',
    description: 'Sanitizable waterproof rexine medical mattresses in 2-fold, 3-fold, and 4-fold ICU/ward configurations.',
    defaultMaterials: ['Rebonded Orthopedic Foam', 'PU Foam (High Resilience)'],
    specs: ['2 / 3 / 4 Section Folding Cuts', 'Fluid-Proof Medical Rexine', 'Clinic & Home-Care Ready']
  }
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [deviceView, setDeviceView] = useState('responsive');

  // URL Hash Listener for #admin support
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setActivePage('admin');
      }
    };

    if (window.location.hash === '#admin') {
      setActivePage('admin');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const businessSettings = {
    businessName: 'PHENA COMFORTS',
    teluguName: 'ఫెన కంఫర్ట్స్',
    tagline: 'Comfort Made to Your Measurements.',
    whatsappNumber: '919581699988',
    displayPhone: '+91 95816 99988',
    isoCert: 'An ISO 9001: 2015 Certified Company',
    gmpCert: 'GMP Certified (Good Manufacturing Practice)',
    address: 'Fr.No. 199/2019, Sy. No. 842/2, Kothapeta, CTM Cross Road, Near Rly. Station, Annamayya Dist., Pin: 517319'
  };

  const [materials] = useState(INITIAL_MATERIALS);
  const [products] = useState(INITIAL_PRODUCTS);

  const [manufacturingMedia, setManufacturingMedia] = useState(() => {
    try {
      const saved = localStorage.getItem('phena_mfg_media');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('phena_mfg_media', JSON.stringify(manufacturingMedia));
    } catch (e) {}
  }, [manufacturingMedia]);

  const [builderConfig, setBuilderConfig] = useState({
    productType: 'Custom Mattress',
    selectedMaterials: ['PU Foam (High Resilience)', 'Natural Breathable Latex'],
    length: '78',
    width: '72',
    thickness: '6 inches',
    firmness: 'Medium Firm (Balanced)',
    outerCover: 'Quilted Knitted Jacquard',
    quantity: '1',
    customerName: ''
  });

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [confirmOrderData, setConfirmOrderData] = useState({
    productTitle: 'Custom Mattress',
    selectedMaterials: ['PU Foam (High Resilience)'],
    length: '78',
    width: '72',
    thickness: '6 inches',
    firmness: 'Medium Firm (Balanced)',
    outerCover: 'Quilted Knitted Jacquard',
    quantity: '1',
    customerName: ''
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadProcessTag, setUploadProcessTag] = useState('Foam Cutting & Grading');
  const [uploadType, setUploadType] = useState('photo');
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const fileInputRef = useRef(null);

  const toggleBuilderMaterial = (matName) => {
    setBuilderConfig((prev) => {
      const exists = prev.selectedMaterials.includes(matName);
      if (exists && prev.selectedMaterials.length === 1) return prev;
      const updated = exists
        ? prev.selectedMaterials.filter((m) => m !== matName)
        : [...prev.selectedMaterials, matName];
      return { ...prev, selectedMaterials: updated };
    });
  };

  const toggleConfirmModalMaterial = (matName) => {
    setConfirmOrderData((prev) => {
      const exists = prev.selectedMaterials.includes(matName);
      if (exists && prev.selectedMaterials.length === 1) return prev;
      const updated = exists
        ? prev.selectedMaterials.filter((m) => m !== matName)
        : [...prev.selectedMaterials, matName];
      return { ...prev, selectedMaterials: updated };
    });
  };

  const openOrderConfirmation = (sourceProduct = null) => {
    if (sourceProduct) {
      setConfirmOrderData({
        productTitle: sourceProduct.name,
        selectedMaterials: [...sourceProduct.defaultMaterials],
        length: '78',
        width: '72',
        thickness: '6 inches',
        firmness: 'Medium Firm (Balanced)',
        outerCover: 'Quilted Knitted Jacquard',
        quantity: '1',
        customerName: ''
      });
    } else {
      setConfirmOrderData({
        productTitle: builderConfig.productType,
        selectedMaterials: [...builderConfig.selectedMaterials],
        length: builderConfig.length,
        width: builderConfig.width,
        thickness: builderConfig.thickness,
        firmness: builderConfig.firmness,
        outerCover: builderConfig.outerCover,
        quantity: builderConfig.quantity,
        customerName: builderConfig.customerName
      });
    }
    setOrderModalOpen(true);
  };

  const confirmAndSendWhatsApp = () => {
    const materialsText = confirmOrderData.selectedMaterials.join(' + ');
    const dimsText = `${confirmOrderData.length}" L x ${confirmOrderData.width}" W x ${confirmOrderData.thickness}`;
    const messageLines = [
      `*NEW CUSTOM ORDER ENQUIRY - PHENA COMFORTS (ఫెన కంఫర్ట్స్)*`,
      `-----------------------------------------`,
      `*Product:* ${confirmOrderData.productTitle}`,
      `*Selected Materials (${confirmOrderData.selectedMaterials.length}):* ${materialsText}`,
      `*Exact Dimensions:* ${dimsText}`,
      `*Firmness Preference:* ${confirmOrderData.firmness}`,
      `*Quantity:* ${confirmOrderData.quantity}`,
      confirmOrderData.customerName ? `*Customer Name:* ${confirmOrderData.customerName}` : null,
      `-----------------------------------------`,
      `Please review my material combination and measurements.`
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${businessSettings.whatsappNumber}?text=${encodeURIComponent(messageLines)}`, '_blank');
    setOrderModalOpen(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUser.trim() === 'admin@phenacomforts.com' && adminPass === 'Phena@99988') {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Access Denied! Invalid credentials.');
    }
  };

  const handleDeviceFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadType(file.type.startsWith('video/') ? 'video' : 'photo');
    if (!uploadTitle) setUploadTitle(file.name.replace(/\.[^/.]+\$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => setUploadPreviewUrl(event.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublishManufacturingMedia = (e) => {
    e.preventDefault();
    if (!uploadPreviewUrl) return;
    const newItem = {
      id: `MFG-${Date.now()}`,
      title: uploadTitle.trim() || 'Kothapeta Factory Floor',
      processTag: uploadProcessTag,
      mediaType: uploadType,
      url: uploadPreviewUrl,
      uploadedAt: new Date().toLocaleDateString()
    };
    setManufacturingMedia((prev) => [newItem, ...prev]);
    setUploadTitle('');
    setUploadPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadSuccessMsg('✅ Media uploaded! Check the Manufacturing gallery to view it.');
    setTimeout(() => setUploadSuccessMsg(''), 4000);
  };

  const deleteSingleMedia = (id, title) => {
    setManufacturingMedia((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirmId(null);
    setUploadSuccessMsg(`🗑️ Deleted "${title}" successfully.`);
    setTimeout(() => setUploadSuccessMsg(''), 4000);
  };

  const deleteAllMedia = () => {
    setManufacturingMedia([]);
    localStorage.removeItem('phena_mfg_media');
    setConfirmClearAll(false);
    setUploadSuccessMsg('🗑️ All uploaded photos and videos have been deleted.');
    setTimeout(() => setUploadSuccessMsg(''), 4000);
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setActivePage('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C241E]">
      {/* ISO & GMP Certification Bar */}
      <div className="bg-[#183B2B] text-stone-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-amber-300 font-bold">★ {businessSettings.isoCert}</span>
            <span className="hidden md:inline text-emerald-700">|</span>
            <span className="text-emerald-300 font-semibold">✓ {businessSettings.gmpCert}</span>
          </div>
          <div className="text-stone-300 text-[11px]">
            Annamayya District, Andhra Pradesh
          </div>
        </div>
      </div>

      <div className={`flex-1 flex flex-col transition-all ${deviceView === 'phone-preview' ? 'max-w-[412px] w-full mx-auto my-4 border-[10px] border-stone-900 rounded-[38px] shadow-2xl overflow-hidden bg-[#FAF7F2]' : 'w-full'}`}>
        {/* Header (Hidden from Admin Page) */}
        {activePage !== 'admin' && (
          <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
              <button onClick={() => setActivePage('home')} className="flex items-center gap-3 text-left">
                <div className="flex items-center gap-0.5 shrink-0">
                  <div className="w-6 h-7 rounded-l bg-amber-500 flex items-center justify-center text-white font-bold text-[10px]">P</div>
                  <div className="w-6 h-8 rounded-sm bg-teal-700 flex items-center justify-center text-white font-bold text-[11px] -my-0.5">C</div>
                  <div className="w-6 h-7 rounded-r bg-rose-600 flex items-center justify-center text-white font-bold text-[10px]">M</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#183B2B]">{businessSettings.teluguName}</div>
                  <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-none">{businessSettings.businessName}</div>
                </div>
              </button>

              <nav className="hidden lg:flex items-center gap-1">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'products', label: 'Products' },
                  { id: 'builder', label: 'Custom Builder' },
                  { id: 'manufacturing', label: 'Our Manufacturing' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button key={item.id} onClick={() => setActivePage(item.id)} className={`px-3.5 py-2 rounded-full text-xs font-bold ${activePage === item.id ? 'bg-[#183B2B] text-white' : 'text-stone-700 hover:bg-stone-200/70'}`}>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button onClick={() => openOrderConfirmation(null)} className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-full shadow-sm">
                  Order Custom Mix
                </button>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 pb-12">
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <div>
              <section className="py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-[#F3EFE6] to-[#FAF7F2] border-b border-stone-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#183B2B] text-xs font-bold">
                      ISO 9001:2015 &amp; GMP CERTIFIED MANUFACTURER
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 leading-tight">
                      Comfort Made to <span className="text-[#183B2B] underline decoration-amber-500">Your Measurements.</span>
                    </h1>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                      Manufacturers of customized <strong>PU Foam Mattresses, Pillows, Sofa Cushions, Resting Wedges, Pocketed Spring Mattresses, and Hospital Beds</strong>. Combine multiple materials and order directly via WhatsApp.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => setActivePage('builder')} className="bg-[#183B2B] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md">
                        Customize Your Mattress (Multi-Material)
                      </button>
                      <button onClick={() => setActivePage('products')} className="bg-white text-stone-900 border border-stone-300 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full">
                        Explore Our Products →
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-lg space-y-4">
                    <h3 className="text-base font-extrabold text-stone-900">Choose Multiple Materials &amp; Confirm</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {materials.map((mat) => {
                        const isSelected = builderConfig.selectedMaterials.includes(mat.name);
                        return (
                          <button key={mat.id} type="button" onClick={() => toggleBuilderMaterial(mat.name)} className={`p-2.5 rounded-xl border text-left flex items-start justify-between gap-1.5 ${isSelected ? 'border-[#183B2B] bg-[#183B2B]/10 text-stone-900' : 'border-stone-200 text-stone-600'}`}>
                            <span className="text-xs font-bold leading-snug">{mat.name}</span>
                            <span className="text-xs font-extrabold">{isSelected ? '✓' : '+'}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="bg-stone-100 rounded-xl p-3 text-xs">
                      <span className="text-stone-500 font-semibold">Selected Mix: </span>
                      <span className="font-bold text-[#183B2B]">{builderConfig.selectedMaterials.join(' + ')}</span>
                    </div>
                    <button onClick={() => openOrderConfirmation(null)} className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow">
                      Order Custom Mix
                    </button>
                  </div>
                </div>
              </section>

              <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-6">Our Customized Comfort Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((prod) => (
                    <div key={prod.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-extrabold text-[#183B2B] uppercase">{prod.category}</span>
                        <h3 className="text-lg font-extrabold text-stone-900 mt-1">{prod.name}</h3>
                        <p className="text-xs text-stone-600 mt-2">{prod.description}</p>
                        <ul className="mt-4 space-y-1 border-t border-stone-100 pt-3">
                          {prod.specs.map((s, idx) => (
                            <li key={idx} className="text-xs text-stone-700 font-medium">✓ {s}</li>
                          ))}
                        </ul>
                      </div>
                      <button onClick={() => openOrderConfirmation(prod)} className="mt-5 w-full py-2.5 bg-[#183B2B] text-white rounded-xl font-bold text-xs">
                        Choose Materials &amp; Order
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="py-12 px-4 sm:px-6 bg-[#F3EFE6] border-y border-stone-200">
                <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
                  <div className="max-w-3xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#183B2B] text-xs font-bold">
                      Inside Our Annamayya Dist. Manufacturing Unit
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                      Explore Our Authentic Manufacturing
                    </h2>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                      Our Kothapeta facility operates industrial block-cutting conveyors, multi-color high-density PU foam grading, custom L-shaped sofa cushion moulding, and pocketed spring assembly under strict ISO 9001:2015 &amp; GMP standards.
                    </p>
                    <div className="pt-2">
                      <button onClick={() => setActivePage('manufacturing')} className="bg-[#183B2B] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full">
                        Explore Our Manufacturing Gallery
                      </button>
                    </div>
                  </div>

                  {manufacturingMedia.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {manufacturingMedia.map((item) => (
                        <div key={item.id} className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                          {item.mediaType === 'video' ? (
                            <video src={item.url} controls className="w-full h-48 object-cover bg-black" />
                          ) : (
                            <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
                          )}
                          <div className="p-3">
                            <span className="text-[10px] font-bold uppercase text-emerald-700">{item.processTag}</span>
                            <h4 className="font-bold text-sm text-stone-900">{item.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* PRODUCTS PAGE */}
          {activePage === 'products' && (
            <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-6">All Comfort Products</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-stone-900">{prod.name}</h3>
                      <p className="text-xs text-stone-600 mt-2">{prod.description}</p>
                    </div>
                    <button onClick={() => openOrderConfirmation(prod)} className="mt-6 w-full py-3 bg-[#183B2B] text-white font-bold text-xs rounded-xl">
                      Choose Materials &amp; Order
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* BUILDER PAGE */}
          {activePage === 'builder' && (
            <section className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-5">
                <h1 className="text-2xl font-extrabold text-stone-900">Customize &amp; Combine Multiple Materials</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {materials.map((mat) => {
                    const checked = builderConfig.selectedMaterials.includes(mat.name);
                    return (
                      <button key={mat.id} type="button" onClick={() => toggleBuilderMaterial(mat.name)} className={`p-3 rounded-2xl border-2 text-left flex items-start justify-between ${checked ? 'border-[#183B2B] bg-emerald-50/60' : 'border-stone-200'}`}>
                        <div>
                          <div className="text-xs font-extrabold text-stone-900">{mat.name}</div>
                          <div className="text-[11px] text-emerald-800 font-semibold">{mat.tag}</div>
                        </div>
                        <span className="font-bold text-xs">{checked ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => openOrderConfirmation(null)} className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm">
                  Order Custom Mix
                </button>
              </div>
            </section>
          )}

          {/* MANUFACTURING GALLERY PAGE */}
          {activePage === 'manufacturing' && (
            <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-[#183B2B] uppercase">Inside Our Annamayya Dist. Manufacturing Unit</span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">Explore Our Authentic Manufacturing</h1>
                <p className="text-stone-600 text-sm sm:text-base max-w-3xl">
                  Our Kothapeta facility operates industrial block-cutting conveyors, multi-color high-density PU foam grading, custom L-shaped sofa cushion moulding, and pocketed spring assembly under strict ISO 9001:2015 &amp; GMP standards.
                </p>
              </div>

              {manufacturingMedia.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-stone-300 text-center max-w-xl mx-auto">
                  <h3 className="text-base font-extrabold text-stone-900">Official Factory Gallery</h3>
                  <p className="text-xs text-stone-500 mt-1">Only authentic photos and videos uploaded by the Administrator appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {manufacturingMedia.map((media) => (
                    <div key={media.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                      {media.mediaType === 'video' ? (
                        <video src={media.url} controls className="w-full h-56 object-cover bg-black" />
                      ) : (
                        <img src={media.url} alt={media.title} className="w-full h-56 object-cover" />
                      )}
                      <div className="p-4">
                        <span className="text-[10px] font-bold uppercase text-emerald-700">{media.processTag}</span>
                        <h3 className="text-base font-extrabold text-stone-900 mt-1">{media.title}</h3>
                        <p className="text-[11px] text-stone-400 mt-0.5">Uploaded: {media.uploadedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* CONTACT PAGE */}
          {activePage === 'contact' && (
            <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-stone-200 space-y-3">
                <h1 className="text-2xl font-extrabold">{businessSettings.businessName} ({businessSettings.teluguName})</h1>
                <p className="text-sm text-stone-700">{businessSettings.address}</p>
                <p className="text-base font-extrabold text-[#183B2B]">WhatsApp Enquiries Enabled</p>
              </div>
            </section>
          )}

          {/* ADMIN PORTAL (Opens Separately via #admin URL) */}
          {activePage === 'admin' && (
            <section className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
              {!isAdminLoggedIn ? (
                <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-5 my-12">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h1 className="text-xl font-extrabold text-stone-900">Phena Comforts Admin Portal</h1>
                    <button onClick={navigateToHome} className="text-xs text-stone-500 font-bold underline">← Return to Website</button>
                  </div>
                  {adminError && <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold">{adminError}</div>}
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Admin Username</label>
                      <input type="text" required value={adminUser} onChange={(e) => setAdminUser(e.target.value)} placeholder="Enter admin username" className="w-full p-3 rounded-xl border border-stone-300 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Admin Password</label>
                      <input type="password" required value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="Enter admin password" className="w-full p-3 rounded-xl border border-stone-300 text-sm" />
                    </div>
                    <button type="submit" className="w-full py-3.5 rounded-xl bg-[#183B2B] text-white font-bold text-xs">Sign In to Admin Portal</button>
                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Top Admin Header */}
                  <div className="bg-[#183B2B] text-white rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
                    <div>
                      <span className="text-amber-300 text-xs font-bold uppercase">Administrator Control Panel (Separate Portal)</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold">Upload &amp; Delete Factory Photos / Videos</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={navigateToHome} className="px-4 py-2.5 rounded-xl bg-emerald-900 text-stone-100 font-bold text-xs">View Public Site</button>
                      <button onClick={() => { setIsAdminLoggedIn(false); setAdminUser(''); setAdminPass(''); }} className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">Logout Admin</button>
                    </div>
                  </div>

                  {uploadSuccessMsg && (
                    <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-600 text-emerald-950 text-sm font-extrabold">
                      {uploadSuccessMsg}
                    </div>
                  )}

                  {/* STEP 1: UPLOAD NEW PHOTO OR VIDEO */}
                  <form onSubmit={handlePublishManufacturingMedia} className="bg-white rounded-3xl p-6 border-2 border-stone-200 space-y-4 shadow-sm">
                    <h3 className="text-lg font-extrabold text-stone-900">1. Upload New Photo or Video</h3>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Choose Photo or Video File from Device</label>
                      <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleDeviceFileSelect} className="w-full text-xs border border-stone-300 rounded-xl p-2.5 bg-stone-50" />
                    </div>

                    {uploadPreviewUrl && (
                      <div className="p-3 rounded-2xl bg-stone-100 border border-stone-300 max-w-xs">
                        <p className="text-[11px] font-bold text-stone-600 mb-2">Selected File Preview:</p>
                        {uploadType === 'video' ? (
                          <video src={uploadPreviewUrl} controls className="w-full h-36 object-cover rounded-xl bg-black" />
                        ) : (
                          <img src={uploadPreviewUrl} alt="Preview" className="w-full h-36 object-cover rounded-xl" />
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Photo / Video Title</label>
                        <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} placeholder="e.g., PU Foam Cutting Machine" className="w-full p-3 rounded-xl border border-stone-300 text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Manufacturing Stage</label>
                        <select value={uploadProcessTag} onChange={(e) => setUploadProcessTag(e.target.value)} className="w-full p-3 rounded-xl border border-stone-300 text-xs bg-white">
                          <option value="Foam Cutting & Grading">Foam Cutting &amp; Grading</option>
                          <option value="Pocketed Spring Assembly">Pocketed Spring Assembly</option>
                          <option value="Custom L-Sofa Cushion Moulding">Custom L-Sofa Cushion Moulding</option>
                          <option value="Quilting & Stitching Unit">Quilting &amp; Stitching Unit</option>
                          <option value="ISO & GMP Quality Inspection">ISO &amp; GMP Quality Inspection</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" disabled={!uploadPreviewUrl} className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm disabled:opacity-40 shadow">
                      ⬆️ Upload &amp; Publish to Website
                    </button>
                  </form>

                  {/* STEP 2: DELETE UPLOADED PHOTOS & VIDEOS */}
                  <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 space-y-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-stone-900">
                          2. Delete Uploaded Photos &amp; Videos ({manufacturingMedia.length})
                        </h3>
                        <p className="text-xs text-stone-600">
                          Every photo or video uploaded by Admin is listed below. Click the red <strong>Delete</strong> button to remove it immediately.
                        </p>
                      </div>

                      {manufacturingMedia.length > 0 && (
                        <div>
                          {!confirmClearAll ? (
                            <button
                              type="button"
                              onClick={() => setConfirmClearAll(true)}
                              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow"
                            >
                              🗑️ Delete All ({manufacturingMedia.length})
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 bg-rose-50 p-2 rounded-xl border border-rose-300">
                              <span className="text-xs font-extrabold text-rose-800">Delete all?</span>
                              <button
                                type="button"
                                onClick={deleteAllMedia}
                                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-extrabold text-xs"
                              >
                                Yes, Delete All
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmClearAll(false)}
                                className="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-800 font-bold text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {manufacturingMedia.length === 0 ? (
                      <div className="p-8 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-300 text-center">
                        <p className="text-sm font-bold text-stone-700">No Uploaded Photos or Videos Found</p>
                        <p className="text-xs text-stone-500 mt-1">Upload a photo or video in Step 1 above and it will appear here with a red Delete button.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {manufacturingMedia.map((media) => (
                          <div key={media.id} className="rounded-2xl border-2 border-stone-200 overflow-hidden bg-stone-50 flex flex-col justify-between shadow-sm">
                            <div>
                              {media.mediaType === 'video' ? (
                                <video src={media.url} controls className="w-full h-44 object-cover bg-black" />
                              ) : (
                                <img src={media.url} alt={media.title} className="w-full h-44 object-cover" />
                              )}
                              <div className="p-3.5">
                                <span className="text-[10px] font-bold uppercase text-emerald-700">{media.processTag}</span>
                                <h4 className="text-sm font-extrabold text-stone-900 mt-0.5">{media.title}</h4>
                                <p className="text-[11px] text-stone-400 mt-0.5">Uploaded: {media.uploadedAt}</p>
                              </div>
                            </div>

                            <div className="p-3.5 pt-0">
                              {deleteConfirmId === media.id ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => deleteSingleMedia(media.id, media.title)}
                                    className="flex-1 py-2.5 rounded-xl bg-rose-700 text-white font-extrabold text-xs"
                                  >
                                    ✓ Confirm Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="px-3 py-2.5 rounded-xl bg-stone-300 text-stone-900 font-bold text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(media.id)}
                                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow transition"
                                >
                                  🗑️ Delete This {media.mediaType === 'video' ? 'Video' : 'Photo'}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}
        </main>

        {/* Order Confirmation Modal */}
        {orderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-extrabold">{confirmOrderData.productTitle} - Confirm Materials</h3>
                <button onClick={() => setOrderModalOpen(false)} className="text-stone-500 font-bold">✕</button>
              </div>
              <p className="text-xs text-stone-600 font-semibold">Select or combine more materials for your order:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto">
                {materials.map((mat) => {
                  const isChecked = confirmOrderData.selectedMaterials.includes(mat.name);
                  return (
                    <button key={mat.id} type="button" onClick={() => toggleConfirmModalMaterial(mat.name)} className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-bold ${isChecked ? 'border-[#183B2B] bg-emerald-50 text-stone-900' : 'border-stone-200 text-stone-600'}`}>
                      <span>{mat.name}</span>
                      <span>{isChecked ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
              <div className="p-2.5 rounded-xl bg-stone-100 text-xs">
                <strong>Confirmed Materials: </strong> {confirmOrderData.selectedMaterials.join(' + ')}
              </div>
              <button onClick={confirmAndSendWhatsApp} className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs sm:text-sm">
                Order Custom Mix
              </button>
            </div>
          </div>
        )}

        {/* Clean Footer (No Admin Links) */}
        <footer className="bg-[#1C241E] text-stone-400 py-8 px-4 sm:px-6 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="text-amber-400 font-bold">{businessSettings.teluguName}</div>
              <div className="text-white font-extrabold">{businessSettings.businessName}</div>
              <div>{businessSettings.address}</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setActivePage('manufacturing')} className="underline text-stone-300">Explore Our Manufacturing</button>
              <span className="text-stone-600">|</span>
              <span className="text-stone-500">ISO 9001:2015 &amp; GMP Certified</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}