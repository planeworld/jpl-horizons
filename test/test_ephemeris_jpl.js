var should = require("should");
var ephemeris = require("../lib/ephemeris_jpl");

describe('ephemeris', function() {
    describe('parseObjectData', function() {
        
        var reference_object;
        
        beforeEach(function(){
            reference_object = {
                radius : 12345e3,
                mass : 543e21,
                rotation : 987e-6
            };
        });
    
    
        it('should parse earth data', function() {
            var data =' Mean radius, km          = 12345.0+-0.01 \
                        Mass, 10^23 kg = 5.43+-0.0006 \
                        Mean rot. rate, rad s^-1 = 9.87*10^-4 ';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });

        it('should parse moon data', function() {
            var data =' Radius, km            = 12345.00+-0.03 \
                        Mass, 10^23 kg   =   5.43';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });
        
        it('should parse mercury data', function() {
            var data =' Mean radius (km)      =  12345(+-1) \
                        Mass (10^23 kg )      =     5.43\
                        Sidereal rot. period  =    0.07367989074613009 d ';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });
        
        it('should parse venus data', function() {
            var data =' Equat. radius (1 bar) = 12345+-4 km \
                        Mass (10^23 kg)       =  5.43+-.19 \
                        Sidereal rot. period  =    -0.07367989074613009 d ';

            reference_object.rotation*=-1;
            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
            reference_object.rotation*=-1;
            
        });

        it('should parse mars data', function() {
            var data =' Mean radius (km)      =  12345(+-1) \
                        Mass (10^23 kg)       =  5.43 \
                        Sidereal rot. period  =    1.7683173779071217 hr ';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });

        it('should parse phobos data', function() {
            var data =' Radius (km)      =  12345.0 x11.1 x9.3 \
                        Mass (10^25 kg )       =  5.43 (10^-2) \
                        Sidereal rot. period  =    1.7683173779071217 hr ';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });

        it('should parse jupiter data', function() {
            var data =' Mean radius (km)      =  12345(+-1) \
                        Mass (10^23 kg)       =  5.43 \
                        Rot. rate (10^-4 rad/s)  = 9.87 ';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });

        it('should parse saturn data', function() {
            var data =' Mean radius (km)      =  12345(+-1) \
                        Mass (10^23 kg)       =  5.43 \
                        Rot. rate(10^-4 rad/s)  = 9.87 ';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });

        it('should parse sun data', function() {
            var data =' Radius (photosphere)  = 1234.5(10^1) km \
                        Mass (10^23 kg)       ~  5.43 \
                        Adopted sidereal per  = 0.07367989074613009 d';

            var object = ephemeris._parseObjectData(data);
            object.should.eql(reference_object);
        });
        
    });

    describe('parseEphemeris', function() {
    
        var reference_ephemeris = {
            EC : 1.721107296809000E-02,
            OM : 1.245752380286001E+02,
            W : 3.361773303000747E+02,
            N : 1.142214289946943E-05,
            TA : 1.232355108860352E+02,
            A : 1.494701057043585E+08            
        };
        
        it('should parse earth data', function() {
            var data =' EC= 1.721107296809000E-02 QR= 1.468975648085326E+08 IN= 1.356373174557279E-03 \
                        OM= 1.245752380286001E+02 W = 3.361773303000747E+02 Tp=  2457024.308695656713 \
                        N = 1.142214289946943E-05 MA= 1.215741901404047E+02 TA= 1.232355108860352E+02 \
                        A = 1.494701057043585E+08 AD= 1.520426466001843E+08 PR= 3.151772860561238E+07 ';

            var object = ephemeris._parseEphemeris(data);
            object.should.eql(reference_ephemeris);
        });
    });
    
    
}) 