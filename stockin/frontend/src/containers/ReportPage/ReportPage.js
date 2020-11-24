import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sticky, Menu, Input, Container } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StockReportBlock from '../../components/StockReportBlock/StockReportBlock';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';

const ReportPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const contextRef = createRef();
  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  const [up, setUp] = useState(true);
  const [down, setDown] = useState(false);

  const onClickUpHandler = () => {
    setUp(true);
    setDown(false);
  };
  const onClickDownHandler = () => {
    setDown(true);
    setUp(false);
  };
  let priceList = []
  return (
    <div className="ReportPage" data-testid="ReportPage" ref={contextRef}>
      <Header history={props.history} />
      <Container>
      <Sticky context={contextRef} offset={64.8}>
        <Menu attached="top" tabular style={{ backgroundColor: '#fff', paddingTop: '1em' }}>
          <Menu.Item as="a" active={up} onClick={() => onClickUpHandler()} name="up" />
          <Menu.Item as="a" active={down} onClick={() => onClickDownHandler()} name="down" />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder="Search users..."
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Sticky>
      <StockReportBlock 
        rank="1"
        id="332"
      />
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
      <div>12</div>
      <div>13</div>
      <div>14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
      <div>20</div>
      <div>21</div>
      <div>22</div>
      <div>23</div>
      <div>24</div>
      <div>25</div>
      <div>26</div>
      <div>27</div>
      <div>28</div>
      <div>29</div>
      <div>30</div>
      <div>31</div>
      <div>32</div>
      <div>33</div>
      <div>34</div>
      <div>35</div>
      <div>36</div>
      <div>37</div>
      <div>38</div>
      <div>39</div>
      <div>40</div>
      <div>41</div>
      <div>42</div>
      <div>43</div>
      <div>44</div>
      <div>45</div>
      <div>46</div>
      <div>47</div>
      <div>48</div>
      <div>49</div>
      <div>50</div>
      <div>51</div>
      <div>52</div>
      <div>53</div>
      <div>54</div>
      <div>55</div>
      <div>56</div>
      <div>57</div>
      <div>58</div>
      <div>59</div>
      <div>60</div>
      <div>61</div>
      <div>62</div>
      <div>63</div>
      <div>64</div>
      <div>65</div>
      <div>66</div>
      <div>67</div>
      <div>68</div>
      <div>69</div>
      <div>70</div>
      <div>71</div>
      <div>72</div>
      <div>73</div>
      <div>74</div>
      <div>75</div>
      <div>76</div>
      <div>77</div>
      <div>78</div>
      <div>79</div>
      <div>80</div>
      <div>81</div>
      <div>82</div>
      <div>83</div>
      <div>84</div>
      <div>85</div>
      <div>86</div>
      <div>87</div>
      <div>88</div>
      <div>89</div>
      <div>90</div>
      <div>91</div>
      <div>92</div>
      <div>93</div>
      <div>94</div>
      <div>95</div>
      <div>96</div>
      <div>97</div>
      <div>98</div>
      <div>99</div>
      <div>100</div>
      <div>101</div>
      <div>102</div>
      <div>103</div>
      <div>104</div>
      <div>105</div>
      <div>106</div>
      <div>107</div>
      <div>108</div>
      <div>109</div>
      <div>110</div>
      <div>111</div>
      <div>112</div>
      <div>113</div>
      <div>114</div>
      <div>115</div>
      <div>116</div>
      <div>117</div>
      <div>118</div>
      <div>119</div>
      <div>120</div>
      <div>121</div>
      <div>122</div>
      <div>123</div>
      <div>124</div>
      <div>125</div>
      <div>126</div>
      <div>127</div>
      <div>128</div>
      <div>129</div>
      <div>130</div>
      <div>131</div>
      <div>132</div>
      <div>133</div>
      <div>134</div>
      <div>135</div>
      <div>136</div>
      <div>137</div>
      <div>138</div>
      <div>139</div>
      <div>140</div>
      <div>141</div>
      <div>142</div>
      <div>143</div>
      <div>144</div>
      <div>145</div>
      <div>146</div>
      <div>147</div>
      <div>148</div>
      <div>149</div>
      <div>150</div>
      <div>151</div>
      <div>152</div>
      <div>153</div>
      <div>154</div>
      <div>155</div>
      <div>156</div>
      <div>157</div>
      <div>158</div>
      <div>159</div>
      <div>160</div>
      <div>161</div>
      <div>162</div>
      <div>163</div>
      <div>164</div>
      <div>165</div>
      <div>166</div>
      <div>167</div>
      <div>168</div>
      <div>169</div>
      <div>170</div>
      <div>171</div>
      <div>172</div>
      <div>173</div>
      <div>174</div>
      <div>175</div>
      <div>176</div>
      <div>177</div>
      <div>178</div>
      <div>179</div>
      <div>180</div>
      <div>181</div>
      <div>182</div>
      <div>183</div>
      <div>184</div>
      <div>185</div>
      <div>186</div>
      <div>187</div>
      <div>188</div>
      <div>189</div>
      <div>190</div>
      <div>191</div>
      <div>192</div>
      <div>193</div>
      <div>194</div>
      <div>195</div>
      <div>196</div>
      <div>197</div>
      <div>198</div>
      <div>199</div>
      <div>200</div>
      <div>201</div>
      <div>202</div>
      <div>203</div>
      <div>204</div>
      <div>205</div>
      <div>206</div>
      <div>207</div>
      <div>208</div>
      <div>209</div>
      <div>210</div>
      <div>211</div>
      <div>212</div>
      <div>213</div>
      <div>214</div>
      <div>215</div>
      <div>216</div>
      <div>217</div>
      <div>218</div>
      <div>219</div>
      <div>220</div>
      <div>221</div>
      <div>222</div>
      <div>223</div>
      <div>224</div>
      <div>225</div>
      <div>226</div>
      <div>227</div>
      <div>228</div>
      <div>229</div>
      <div>230</div>
      <div>231</div>
      <div>232</div>
      <div>233</div>
      <div>234</div>
      <div>235</div>
      <div>236</div>
      <div>237</div>
      <div>238</div>
      <div>239</div>
      <div>240</div>
      <div>241</div>
      <div>242</div>
      <div>243</div>
      <div>244</div>
      <div>245</div>
      <div>246</div>
      <div>247</div>
      <div>248</div>
      <div>249</div>
      <div>250</div>
      </Container>
      <Footer history={props.history} />
    </div>
  );
};

export default ReportPage;
